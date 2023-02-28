import React from "react";
import { useSelector } from "react-redux";
import { Typography, Box, Card, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="landing">
      <Box width="98vw" height="90vh" display="flex" justifyContent="center">
        <Box display="flex" m={20} justifyContent="center" alignItems="center">
          {/* <Card
            id="homepagecard"
            m={10}
            p={10}
            sx={{
              height: 400,
              width: 700,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ backgroundColor: "transparent" }}
          > */}
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h3">Grace Pupper</Typography>
            <Typography variant="h4"> Book a puppy playdate!</Typography>
            <span></span>
            <Link to="/puppies">
              <Button>Browse Puppies</Button>
            </Link>
          </Stack>
          {/* </Card> */}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
