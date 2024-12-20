"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    console.log("Request Payload", ctx.request.body);
    try {
      const { products, userName, email } = ctx.request.body;

      if (!products || !userName || !email || products.length === 0) {
        ctx.response.status = 400;
        return { error: { message: "Missing required fields" } };
      }

      // Debug Log
      console.log("Received order request: ", { products, userName, email });

      // retrieve item information
      const lineItems = await Promise.all(
        products.map(async (product, i) => {
          try {
            // console.log("Cart Items: ", product);
            const item = await strapi
              .service("api::item.item")
              .findOne(product.documentId);

            if (!item) {
              throw new Error(
                `Item with product ID ${product.documentId} was not found`
              );
            }

            console.log("Fetched Items", item); // Checking if the item object is returned correctly

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price * 100,
              },
              quantity: product.count,
            };
          } catch (error) {
            console.error(`Error fetching product with ID: ${product.id}`);
            throw error;
          }
        })
      );

      console.log("Line Items Array: ", lineItems); // Verifying the final array

      // create a stripe session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:5174/checkout/success",
        cancel_url: "http://localhost:5174",
        line_items: lineItems,
      });

      // create the item
      const order = await strapi.service("api::order.order").create({
        data: { userName, products, stripeSessionId: session.id },
      });

      // Debug Log
      console.log("Created Session: ", session.id);

      // return the session id
      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return {
        error: {
          message: error.message || "Internal Server Error.",
        },
      };
    }
  },
}));
