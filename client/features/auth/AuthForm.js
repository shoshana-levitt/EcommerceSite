import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { TextField, Button, Grid, Typography } from "@mui/material";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const [isSignup, setIsSignup] = useState(name === "signup");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    let firstName = undefined;
    let lastName = undefined;
    if (isSignup) {
      firstName = evt.target.firstName.value;
      lastName = evt.target.lastName.value;
    }
    dispatch(
      authenticate({
        username,
        password,
        firstName,
        lastName,
        method: formName,
      })
    );
    navigate("/user");
  };

  const handleSignup = (evt) => {
    evt.preventDefault();
    setIsSignup(true);
    setUsername(evt.target.username.value);
    navigate("/signup");
  };

  return (
    <div>
      {!isSignup ? (
        <Typography>Existing User?</Typography>
      ) : (
        <Typography>Create An Account</Typography>
      )}
      <form onSubmit={handleSubmit} name={name}>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Email"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="email"
              required
            />
            <TextField
              variant="outlined"
              label="Password"
              name="password"
              type="password"
              required
            />
            {isSignup && (
              <>
                <TextField
                  variant="outlined"
                  label="First Name"
                  name="firstName"
                  required
                />
                <TextField
                  variant="outlined"
                  label="Last Name"
                  name="lastName"
                  required
                />
              </>
            )}
          </Grid>
        </Grid>
        <div>
          <Button type="submit">{displayName}</Button>
        </div>
        {error && <div> {error} </div>}
      </form>
      {!isSignup && (
        <>
          <Typography>New Visitor?</Typography>
          <form onSubmit={handleSignup}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Email"
                  name="username"
                  type="email"
                  required
                />
              </Grid>
            </Grid>
            <div>
              <Button type="submit">Create Account</Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AuthForm;
