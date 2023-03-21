import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePuppy } from "./SinglePuppySlice";
import { addToCart } from "../cart/CartSlice";
import {
  Typography,
  Stack,
  Button,
  Box,
  Skeleton,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

const SinglePuppyView = () => {
  const dispatch = useDispatch();
  const puppy = useSelector((state) => state.puppy);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePuppy(id));
  }, [dispatch]);

  const [clicked, setClicked] = useState(false);

  const addToCartHandler = async () => {
    if (isLoggedIn) {
      await dispatch(addToCart({ userId: userId, puppyId: puppy.id }));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      if (savedCart) {
        savedCart.push(puppy);
      } else savedCart = [puppy];
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
    }
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  return (
    <>
      <div>
        {puppy.breed ? (
          <>
            <Box
              m={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Stack direction="column" alignItems="center">
                <Stack direction="row" alignItems="center">
                  <Card sx={{ minWidth: 350 }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={puppy.photoURL}
                      alt="puppy image"
                    />
                  </Card>
                  <Box sx={{ width: 300 }}>
                    <Stack
                      direction="column"
                      alignItems="center"
                      justifyContent="center"
                      m={2}
                    >
                      <Typography variant="h3">
                        {puppy.name.charAt(0).toUpperCase() +
                          puppy.name.slice(1)}
                      </Typography>
                      <Typography>
                        Breed:{" "}
                        {puppy.breed.charAt(0).toUpperCase() +
                          puppy.breed.slice(1)}
                      </Typography>
                      <Typography>
                        Color:{" "}
                        {puppy.color.charAt(0).toUpperCase() +
                          puppy.color.slice(1)}
                      </Typography>
                      <Typography>Age: {puppy.age}</Typography>
                      <Typography>Playdate Price: ${puppy.price}</Typography>

                      <Button
                        startIcon={<AddShoppingCart />}
                        variant="contained"
                        onClick={addToCartHandler}
                        sx={{ width: 200 }}
                      >
                        Add to cart
                      </Button>
                      {clicked && (
                        <div>
                          <Typography>Added to cart!</Typography>
                        </div>
                      )}
                    </Stack>
                  </Box>
                </Stack>
                <Box sx={{ width: 800 }} m={2}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    About{" "}
                    {puppy.name.charAt(0).toUpperCase() + puppy.name.slice(1)}:{" "}
                  </Typography>
                  <Typography>{puppy.description}</Typography>
                </Box>
              </Stack>
            </Box>
          </>
        ) : (
          <Stack direction="column" justifyContent="center" alignItems="center">
            <Skeleton variant="rectangular" width={500} height={500} />
          </Stack>
        )}
      </div>
    </>
  );
};

export default SinglePuppyView;
