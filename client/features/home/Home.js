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
          <Card
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
          >
            <Stack justifyContent="center" alignItems="center" spacing={2}>
              <Typography variant="h3">Grace Shopper</Typography>
              <Typography variant="h4"> Book a puppy playdate!</Typography>
              <span></span>
              <Link to="/puppies">
                <Button>Browse Puppies</Button>
              </Link>
            </Stack>
          </Card>
        </Box>
      </Box>
    </div>
    // <div>
    //   <div>
    //     <Typography variant="h4" align="center" margin={3}>
    //       Welcome to the homepage!
    //     </Typography>
    //   </div>
    // </div>
  );
};

export default Home;
