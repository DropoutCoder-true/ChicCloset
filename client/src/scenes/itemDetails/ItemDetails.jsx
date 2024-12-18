import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useParams } from "react-router-dom";
import Item from "../../components/Item";

const ItemDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      setIsLoading(true);
      const item = await fetch(
        `http://localhost:1337/api/items?filters[documentId][$eq]=${id}&populate=*`,
        {
          method: "GET",
        }
      );
      const itemJSON = await item.json();
      setItem(itemJSON.data[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  async function getItems() {
    const items = await fetch("http://localhost:1337/api/items?populate=*", {
      method: "GET",
    });
    const itemsJSON = await items.json();
    setItems(itemsJSON.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [id]);

  console.log("Items Object:- ", item);
  console.log("long Description:- ", item?.longDescription);
  console.log("Short Description:- ", item?.shortDescription);
  return (
    <>
      {isLoading ? (
        <Typography>Loading....</Typography>
      ) : (
        <Box width={"80%"} m={"80px auto"}>
          <Box display={"flex"} flexWrap={"wrap"} columnGap={"40px"}>
            {/* Images */}
            <Box flex={"1 1 40%"} mb={"40px"}>
              <img
                src={`http://localhost:1337${item?.image?.formats?.medium?.url}`}
                alt={item?.name}
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "contain" }}
              />
            </Box>

            {/* ACTIONS */}
            <Box flex="1 1 50%" mb={"40px"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>Home/Item</Box>
                <Box>Prev Next</Box>
              </Box>

              <Box m={"65px 0 25px 0"}>
                <Typography variant="h3">{item?.name}</Typography>
                <Typography>${item?.price}</Typography>
                {item?.shortDescription?.map((desc, index) => (
                  <Typography key={index} sx={{ mt: "20px" }}>
                    {desc?.children[0]?.text}
                  </Typography>
                ))}
              </Box>

              {/* COUNT AND BUTTON  */}
              <Box display={"flex"} alignItems={"center"} minHeight={"50px"}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  border={`1.5px solid ${shades.neutral[300]}`}
                  mr={"20px"}
                  p={"2px 5px"}
                >
                  <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ p: "0 5px" }}>{count}</Typography>
                  <IconButton onClick={() => setCount(count + 1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
                <Button
                  sx={{
                    backgroundColor: "#222222",
                    color: "white",
                    borderRadius: 0,
                    minWidth: "150px",
                    padding: "10px 40px",
                  }}
                  onClick={() =>
                    dispatch(addToCart({ item: { ...item, count } }))
                  }
                >
                  ADD TO CART
                </Button>
              </Box>

              <Box>
                <Box m={"20px 0 5px 0"} display={"flex"}>
                  <FavoriteBorderOutlinedIcon />
                  <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                </Box>
                <Typography>
                  CATEGORIES: {item?.category.toUpperCase()}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* INFORMATION */}
          <Box m={"20px 0"}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="DESCRIPTION" value="description" />
              <Tab label="REVIEWS" value="reviews" />
            </Tabs>
          </Box>
          <Box display={"flex"} flexWrap={"wrap"} gap="15px">
            {value === "description" && (
              <div>
                {item?.longDescription?.map((desc, index) => (
                  <Typography key={index} sx={{ mb: "10px" }}>
                    {desc?.children[0]?.text}
                  </Typography>
                ))}
              </div>
            )}
            {value === "reviews" && <div>reviews</div>}
          </Box>

          {/* RELATED ITEMS */}
          <Box mt={"50px"} width={"100%"}>
            <Typography variant="h3" fontWeight={"bold"}>
              Related Products
            </Typography>
            <Box
              mt={"20px"}
              display={"flex"}
              flexWrap={"wrap"}
              columnGap={"1.33%"}
              justifyContent={"space-between"}
            >
              {items.slice(0, 4).map((item, i) => (
                <Item key={`${item?.name}-${i}`} item={item} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ItemDetails;
