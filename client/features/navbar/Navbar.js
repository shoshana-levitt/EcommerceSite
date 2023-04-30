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
import { ShoppingCart, Pets } from "@mui/icons-material";
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
            <Button
              startIcon={<Pets />}
              href="/"
              variant="text"
              disableRipple="true"
              sx={{
                m: 1,
                color: "black",
                ":hover": {
                  backgroundColor: "transparent",
                  color: "#274e13",
                },
              }}
            >
              Browse Puppies
            </Button>
            {user.isAdmin && (
              <div>
                <Button
                  href="/allusers"
                  variant="text"
                  disableRipple="true"
                  sx={{
                    m: 1,
                    color: "black",
                    ":hover": {
                      backgroundColor: "transparent",
                      color: "#274e13",
                    },
                  }}
                >
                  All Users
                </Button>
              </div>
            )}
          </Box>
          {isLoggedIn ? (
            <div>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                {user.isAdmin && (
                  <Typography align="center" color="green" variant="subtitle2">
                    ADMIN VIEW
                  </Typography>
                )}
                <Button
                  onClick={logoutAndRedirectHome}
                  variant="text"
                  disableRipple="true"
                  sx={{
                    m: 1,
                    color: "black",
                    ":hover": {
                      backgroundColor: "transparent",
                      color: "#274e13",
                    },
                  }}
                  size="small"
                >
                  Log Out
                </Button>
                <IconButton href="/user" disableRipple>
                  <Avatar
                    sx={{
                      bgcolor: "#93c47d",
                      color: "black",
                      ":hover": {
                        bgcolor: "#6aa84f",
                      },
                    }}
                  >
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
                disableRipple="true"
                sx={{
                  m: 1,
                  color: "black",
                  ":hover": {
                    backgroundColor: "transparent",
                    color: "#274e13",
                  },
                }}
              >
                Log In
              </Button>
              <Button
                href="/signup"
                variant="text"
                disableRipple
                sx={{
                  m: 1,
                  color: "black",
                  ":hover": {
                    backgroundColor: "transparent",
                    color: "#274e13",
                  },
                }}
              >
                Sign Up
              </Button>
            </div>
          )}
          <IconButton
            href="/cart"
            disableRipple="true"
            sx={{
              color: "black",
              ":hover": {
                backgroundColor: "transparent",
                color: "#274e13",
              },
            }}
          >
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
