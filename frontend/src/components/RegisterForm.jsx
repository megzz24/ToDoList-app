import React, { useState } from "react";
import axios from "../axiosInstance";     
import { Link, useNavigate } from "react-router-dom"; 

import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tooltip,
} from "@mui/material";

const RegisterForm = () => {
  const [form, setForm] = useState({
    first_name: "",  
    last_name: "",    
    username: "",     
    email: "",
    password: "",    
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        form
      );

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      setMessage("Registration successful!");
      navigate("/dashboard");

    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
        setMessage(error.response.data.message || "Registration failed.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  const isFormComplete = Object.values(form).every(
    (value) => value.trim() !== "" 
  );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FF6767",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400, 
          p: 3,          
          border: "1px solid #ccc",
          borderRadius: 2, 
          boxShadow: 1,    
          backgroundColor: "#fff",
        }}
      >

        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#212427", mb: 2, fontWeight: "bold" }}
        >
          Sign Up
        </Typography>

        {message && (
          <Alert
            severity={message.includes("successful") ? "success" : "error"}
          >
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Enter First Name"            
            name="first_name"                  
            value={form.first_name}            
            onChange={handleChange}             
            fullWidth                          
            margin="normal"                     
            error={!!errors.first_name}         
            helperText={
              errors.first_name ? errors.first_name[0] : ""
            }
            sx={{ color: "#212427" }}           
          />

          <TextField
            label="Enter Last Name"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.last_name}
            helperText={errors.last_name ? errors.last_name[0] : ""}
            sx={{ color: "#212427" }}
          />

          <TextField
            label="Enter Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username ? errors.username[0] : ""}
            sx={{ color: "#212427" }}
          />

          <TextField
            label="Enter Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email ? errors.email[0] : ""}
            sx={{ color: "#212427" }}
          />

          <TextField
            label="Enter Password"
            name="password"
            type="password"                    
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password[0] : ""}
            sx={{ color: "#212427" }}
          />

          <Tooltip
            title={!isFormComplete ? "Fill in all fields to register" : ""}
            placement="bottom"
            arrow
          >
            <span style={{ display: "inline-block" }}>
              <Button
                type="submit"                      
                variant="contained"               
                width="10%"
                sx={{
                  mt: 2,                          
                  backgroundColor: "#FF9090",     
                  textTransform: "capitalize",    
                  color: "#F8F9FB",               
                  "&.Mui-disabled": {
                    backgroundColor: "#FF9090",   
                    opacity: 1,
                    cursor: "not-allowed",        
                    color: "#F8F9FB",
                  },
                }}
                disabled={!isFormComplete}        
              >
                Register
              </Button>
            </span>
          </Tooltip>
        </form>

        <Typography variant="body2" sx={{ mt: 2, color: "#212427" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#008BD9", textDecoration: "none" }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
