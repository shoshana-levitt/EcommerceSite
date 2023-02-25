import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/store";
import { me } from "../auth/authSlice";
import {
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { ShoppingCart, Home } from "@mui/icons-material";
import { grey, blue } from "@mui/material/colors";
import { fetchCart } from "../cart/CartSlice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };
  const user = useSelector((state) => state.auth.me);
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(me());
    if (isLoggedIn) {
      dispatch(fetchCart(user.id));
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div>
      <AppBar position="fixed" sx={{ bgcolor: "#b6d7a8" }}>
        <Toolbar sx={{ p: -1 }}>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <IconButton href="/" disableRipple>
              <Home></Home>
            </IconButton>
            <Button
              href="/puppies"
              variant="text"
              disableRipple
              sx={{ m: 1, color: "black" }}
            >
              All Puppies
            </Button>
            {user.isAdmin && (
              <div>
                <Button
                  href="/allusers"
                  variant="text"
                  disableRipple
                  sx={{ m: 1, color: "black" }}
                >
                  All Users
                </Button>
              </div>
            )}
          </Box>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                {user.isAdmin && (
                  <Typography align="center" color="blue">
                    ADMIN VIEW
                  </Typography>
                )}
                <Button
                  onClick={logoutAndRedirectHome}
                  variant="text"
                  disableRipple
                  sx={{ m: 1, color: "black" }}
                  size="small"
                >
                  Log Out
                </Button>
                <IconButton href="/user" disableRipple>
                  <Avatar sx={{ bgcolor: "#93c47d" }}>
                    {user.firstName.charAt(0)}
                  </Avatar>
                </IconButton>
              </Stack>
            </div>
          ) : (
            <div>
              <Button
                href="/login"
                variant="text"
                disableRipple
                sx={{ m: 1, color: "black" }}
              >
                Log In
              </Button>
              <Button
                href="/signup"
                variant="text"
                disableRipple
                sx={{ m: 1, color: "black" }}
              >
                Sign Up
              </Button>
            </div>
          )}
          <IconButton href="/cart">
            <Badge
              badgeContent={
                isLoggedIn
                  ? cart
                    ? cart.length
                    : null
                  : JSON.parse(window.localStorage.getItem("cart"))
                  ? JSON.parse(window.localStorage.getItem("cart")).length
                  : null
              }
              color="primary"
              disableRipple
              sx={{ m: 2 }}
            >
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default Navbar;
