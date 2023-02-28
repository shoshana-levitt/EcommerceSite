import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
  Grid,
  Stack,
} from "@mui/material";
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

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Stack justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="h3">Grace Pupper</Typography>
          <Typography variant="h6">Book a puppy playdate!</Typography>
        </Stack>
      </Box>

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
                          {puppy.name} the{" "}
                          {puppy.breed.charAt(0).toUpperCase() +
                            puppy.breed.slice(1)}
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
