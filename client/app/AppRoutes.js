import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import { me } from "./store";
import Allpuppies from "../features/allpuppies/Allpuppies";
import SinglePuppyView from "../features/SinglePuppyView/SinglePuppyView";
import AllUsers from "../features/allusers/allUsers";
import Profile from "../features/profile/Profile";
import Cart from "../features/cart/Cart";
import Checkout from "../features/checkout/checkout";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);
  const user = useSelector((state) => state.auth.me);
  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Allpuppies name="allpuppies" displayName="All Puppies" />}
        />
        <Route path="/puppies/:id" element={<SinglePuppyView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {isLoggedIn ? (
        <Routes>
          <Route path="/user" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={<AuthForm name="login" displayName="Log In" />}
          />
          <Route
            path="/signup"
            element={<AuthForm name="signup" displayName="Sign Up" />}
          />
        </Routes>
      )}
      {user.isAdmin && (
        <Routes>
          <Route path="/allusers" element={<AllUsers />} />
        </Routes>
      )}
    </div>
  );
};

export default AppRoutes;
