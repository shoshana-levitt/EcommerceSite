import React from "react";
import { Typography, Box, Stack } from "@mui/material";

const Checkout = () => {
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="h3">
            Your puppy playdate booking was successful!
          </Typography>
          <Typography variant="h6">
            Please check your email for your full order details.
          </Typography>
        </Stack>
      </Box>
    </div>
  );
};

export default Checkout;
