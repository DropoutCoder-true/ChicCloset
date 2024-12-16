import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt={"70px"} p={"40px 0"} backgroundColor={"neutral.light"}>
      <Box
        width={"80%"}
        margin={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        rowGap={"30px"}
        columnGap={"clamp(20px, 30px, 40px)"}
      >
        <Box width={"clamp(20%, 30%, 40%)"}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            mb="30px"
            color={shades.secondary[500]}
          >
            ChicCloset
          </Typography>
          <div>
            Discover the latest trends and timeless styles at ChicCloset. We are
            dedicated to providing high-quality, fashionable clothing for women
            who want to look and feel their best. Our collections are carefully
            curated to offer a mix of classic elegance and modern chic, ensuring
            there's something for every occasion.
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight={"bold"} mb={"30px"}>
            About US
          </Typography>
          <Typography mb={"30px"}>Careers</Typography>
          <Typography mb={"30px"}>Our Stores</Typography>
          <Typography mb={"30px"}>Terms & Conditions</Typography>
          <Typography mb={"30px"}>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight={"bold"} mb={"30px"}>
            Customer Care
          </Typography>
          <Typography mb={"30px"}>Help Center</Typography>
          <Typography mb={"30px"}>Track Your Order</Typography>
          <Typography mb={"30px"}>Corporate & Bulk Purchasing</Typography>
          <Typography mb={"30px"}>Returns & Refunds</Typography>
        </Box>

        <Box width={"clamp(20%, 25%, 30%)"}>
          <Typography variant="h4" fontWeight={"bold"} mb={"30px"}>
            Contact US
          </Typography>
          <Typography mb={"30px"}>Can't reveal much about it</Typography>
          <Typography mb={"30px"}>Email: zagadevighnesh4@gmail.com</Typography>
          <Typography mb={"30px"}>(+91) 9173695990</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
