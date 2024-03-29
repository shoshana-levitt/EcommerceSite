import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsersAsync, selectAllUsers } from "./usersSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AllUsers = () => {
  const allUsers = [...useSelector(selectAllUsers)].sort((a, b) => a.id - b.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAsync());
  }, [dispatch]);

  function createData(id, firstName, lastName, username) {
    return { id, firstName, lastName, username };
  }

  const rows = [];
  allUsers.forEach((user) => {
    rows.push(
      createData(user.id, user.firstName, user.lastName, user.username)
    );
  });

  return (
    <TableContainer
      component={Paper}
      sx={{ m: 1, height: "88vh", backgroundColor: "transparent" }}
    >
      <Table
        stickyHeader
        sx={{ minWidth: 500, backgroundColor: "transparent" }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">User ID</TableCell>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.firstName}</TableCell>
              <TableCell align="left">{row.lastName}</TableCell>
              <TableCell align="left">{row.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllUsers;
