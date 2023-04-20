import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { me } from "../auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  return (
    <div>
      <Box m={2}>
        <Typography variant="h2">
          Welcome, {user.firstName} {user.lastName}!
        </Typography>
        {user.isAdmin ? (
          <>
            <Typography variant="h4">Account Type: Administrator</Typography>
            <Typography variant="h6">
              As an admin, you can view all users on the platform.
            </Typography>
          </>
        ) : (
          <Typography variant="h4">Account Type: Basic</Typography>
        )}
      </Box>
    </div>
  );
};

export default Profile;
