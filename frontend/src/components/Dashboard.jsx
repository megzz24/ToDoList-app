import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("access");
        const res = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />

      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingLeft: "220px",
          backgroundColor: "#F5F8FF",
          boxSizing: "border-box",
          minWidth: "100vw",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            p: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#000", marginTop: "15px" }}
          >
            {user ? `Welcome back, ${user.first_name}!` : "Loading..."}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
