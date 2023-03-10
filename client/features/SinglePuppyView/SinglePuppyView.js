import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSinglePuppy } from "./SinglePuppySlice";
import { addToCart } from "../cart/CartSlice";
import { Typography, Stack, Button, Box, Skeleton } from "@mui/material";
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
  };

  return (
    <>
      <div>
        {puppy.breed ? (
          <>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-evenly">
                <img src={puppy.photoURL} className="single-puppy-photo" />
                <Stack
                  direction="column"
                  justifyContent="space-evenly"
                  sx={{ my: 20 }}
                >
                  <Typography sx={{ fontSize: 50 }}>{puppy.name}</Typography>
                  <Typography>
                    Breed:{" "}
                    {puppy.breed.charAt(0).toUpperCase() + puppy.breed.slice(1)}
                  </Typography>
                  <Typography>
                    Color:{" "}
                    {puppy.color.charAt(0).toUpperCase() + puppy.color.slice(1)}
                  </Typography>
                  <Typography>Age: {puppy.age}</Typography>
                  <Typography>Price: ${puppy.price}</Typography>
                  <Typography>{puppy.description}</Typography>
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
