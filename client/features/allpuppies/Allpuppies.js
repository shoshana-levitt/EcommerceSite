import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { CardActionArea, Button, Box } from "@mui/material";
import { fetchAllPuppiesAsync, selectAllPuppies } from "./allpuppiesSlice";
import { me } from "../auth/authSlice";
import DeletePuppyButton from "../deletePuppy/DeletePuppyButton";

const Allpuppies = () => {
  const allPuppies = useSelector(selectAllPuppies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPuppiesAsync());
  }, [dispatch]);

  const user = useSelector((state) => state.auth.me);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  // let capitalizeBreed = (puppy) => {
  //   return puppy.breed.charAt(0).toUpperCase() + puppy.breed.str.slice(1);
  // };

  return (
    <div>
      <div position="sticky">
        <Typography variant="h3" component="h2" align="center" sx={{ p: 2 }}>
          Puppies
        </Typography>
      </div>
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ p: 2 }}
        >
          <div>
            {allPuppies.map((puppy) => (
              <Grid
                key={puppy.id}
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ m: 0.75 }}
                style={{
                  display: "inline-block",
                }}
              >
                <NavLink to={`/puppies/${puppy.id}`}>
                  <Card sx={{ width: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="250"
                        image={puppy.photoURL}
                        alt="puppy image"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          align="center"
                        >
                          {puppy.name} the {puppy.breed}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </NavLink>
                {/* {user.isAdmin && (
                <>
                  <NavLink to={`/puppies/${puppy.id}`}>
                    <Button>Edit</Button>
                  </NavLink>
                  <DeletePuppyButton puppyId={puppy.id} />
                </>
              )} */}
              </Grid>
            ))}
          </div>
        </Grid>
      </Box>
      {/* {user.isAdmin && (
        <>
          <Button>Add New Puppy</Button>
        </>
      )} */}
    </div>
  );
};

export default Allpuppies;
