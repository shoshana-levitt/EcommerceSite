import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  CartSlice,
  checkout,
  clearUserCart,
  decrementProduct,
  fetchCart,
  removeProductFromCart,
} from "./CartSlice";
import {
  Button,
  ButtonGroup,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  ShoppingCartCheckout,
  RemoveShoppingCart,
  RemoveCircleOutline,
} from "@mui/icons-material";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartToShow, setCartToShow] = useState([]);
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const userId = useSelector((state) => state.auth.me.id);
  let stateCart = useSelector((state) => state.cart);
  let productIds = {};
  let cartWithQuantities = [];

  const updateCartView = (savedCart) => {
    if (savedCart) {
      if (savedCart.length) {
        savedCart.forEach((product) => {
          productIds[product.id] = true;
        });
        let count = 0;
        Object.keys(productIds).forEach((key) => {
          let filteredArr = JSON.stringify(
            savedCart.filter((product) => product.id === Number(key))
          );
          cartWithQuantities.push(JSON.parse(filteredArr)[0]);
          cartWithQuantities[count].quantity = JSON.parse(filteredArr).length;
          cartWithQuantities[count].price *= JSON.parse(filteredArr).length;
          count++;
        });
        setCartToShow(cartWithQuantities);
      } else setCartToShow([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart(userId));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      updateCartView(savedCart);
      if (savedCart) {
        savedCart.map((product) => {
          dispatch(CartSlice.actions.addProduct(product));
        });
      }
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    updateCartView(stateCart);
  }, [stateCart]);

  const clearCartHandler = () => {
    if (isLoggedIn) {
      dispatch(clearUserCart(userId));
      dispatch(fetchCart(userId));
    } else {
      delete window.localStorage.cart;
      dispatch(CartSlice.actions.clearCart());
    }
    setEmptyOpen(false);
  };

  const incrementProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart({ userId: userId, puppyId: product.id }));
    } else {
      product.price /= product.quantity;
      delete product.quantity;
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      savedCart.push(product);
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
      dispatch(CartSlice.actions.addProduct(product));
    }
  };

  const decrementProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(decrementProduct({ userId: userId, puppyId: product.id }));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      let removed = false;
      savedCart = savedCart.filter((oldProduct) => {
        if (!removed && oldProduct.id === product.id) {
          removed = true;
          return oldProduct.id !== product.id;
        } else return true;
      });
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
      dispatch(CartSlice.actions.subtractProduct(product));
    }
  };

  const removeProductHandler = (product) => {
    if (isLoggedIn) {
      dispatch(removeProductFromCart({ userId: userId, puppyId: product.id }));
    } else {
      let savedCart = JSON.parse(window.localStorage.getItem("cart"));
      savedCart = savedCart.filter(
        (oldProduct) => oldProduct.id !== product.id
      );
      window.localStorage.setItem("cart", JSON.stringify(savedCart));
      setRemoveOpen(false);
      dispatch(CartSlice.actions.removeProduct(product));
    }
  };

  const checkoutHandler = async () => {
    if (isLoggedIn) {
      await dispatch(checkout(userId));
    } else {
      delete window.localStorage.cart;
      dispatch(CartSlice.actions.clearCart());
    }
    navigate("/checkout");
  };

  const [removeOpen, setRemoveOpen] = useState(false);

  const handleRemoveOpen = () => {
    setRemoveOpen(true);
  };

  const handleRemoveClose = () => {
    setRemoveOpen(false);
  };

  const [emptyOpen, setEmptyOpen] = useState(false);

  const handleEmptyOpen = () => {
    setEmptyOpen(true);
  };

  const handleEmptyClose = () => {
    setEmptyOpen(false);
  };

  return (
    <>
      {cartToShow[0] === undefined && (
        <Box m={2}>
          <Typography variant="h4">Your cart is empty.</Typography>
          <Typography variant="h6">Book a puppy playdate!</Typography>
          <Button href="/allusers" variant="contained" sx={{ width: 200 }}>
            Browse Puppies
          </Button>
        </Box>
      )}

      {cartToShow[0] && (
        <div>
          <Typography variant="h4" m={2}>
            My Cart
          </Typography>
          <Button
            startIcon={<RemoveShoppingCart />}
            variation="contained"
            onClick={handleEmptyOpen}
            m={2}
          >
            Clear Cart
          </Button>
          {emptyOpen && (
            <Dialog
              open={emptyOpen}
              onClose={handleEmptyClose}
              BackdropProps={{ style: { backgroundColor: "transparent" } }}
            >
              <DialogTitle>Clear Cart</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to clear your cart?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEmptyClose}>No</Button>
                <Button onClick={() => clearCartHandler()}>
                  Yes, Clear Cart
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}
      {cartToShow[0] &&
        cartToShow.map((product) => {
          return (
            <div key={product.id}>
              <Box m={2}>
                <Card
                  sx={{ display: "flex", width: 600 }}
                  style={{ backgroundColor: "transparent" }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.photoURL}
                    alt="puppy image"
                    sx={{
                      maxWidth: 300,
                    }}
                    background
                  />
                  <CardContent sx={{ width: 200 }} align="center">
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name} the{" "}
                      {product.breed.charAt(0).toUpperCase() +
                        product.breed.slice(1)}
                    </Typography>
                    <ButtonGroup variant="contained">
                      <Button
                        disabled={product.quantity < 2}
                        onClick={() => decrementProductHandler(product)}
                      >
                        -
                      </Button>
                      <Button
                        sx={{
                          "&.Mui-disabled": {
                            background: "#6aa84f",
                            color: "black",
                          },
                        }}
                        disabled
                      >
                        {product.quantity}
                      </Button>
                      <Button onClick={() => incrementProductHandler(product)}>
                        +
                      </Button>
                    </ButtonGroup>
                    <Typography>${product.price.toFixed(2)}</Typography>
                    <Button
                      startIcon={<RemoveCircleOutline />}
                      variation="contained"
                      onClick={handleRemoveOpen}
                    >
                      Remove
                    </Button>
                  </CardContent>
                </Card>
              </Box>
              {removeOpen && (
                <Dialog
                  open={removeOpen}
                  onClose={handleRemoveClose}
                  BackdropProps={{ style: { backgroundColor: "transparent" } }}
                >
                  <DialogTitle>Remove Puppy</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to remove this puppy?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleRemoveClose}>No</Button>
                    <Button onClick={() => removeProductHandler(product)}>
                      Yes, Remove
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </div>
          );
        })}
      {cartToShow[0] && (
        <Typography variant="h6" m={2}>
          Total Price: $
          {cartToShow
            .reduce((accum, product) => accum + product.price, 0)
            .toFixed(2)}
        </Typography>
      )}
      {cartToShow[0] && (
        <Button
          startIcon={<ShoppingCartCheckout />}
          variation="contained"
          onClick={checkoutHandler}
        >
          Check Out
        </Button>
      )}
    </>
  );
};

export default Cart;
