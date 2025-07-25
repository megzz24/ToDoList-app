import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tooltip,
} from "@mui/material";

const LoginForm = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
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
        "http://localhost:8000/api/login/",
        form
      );

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);


      setMessage("Login successful!");

      setForm({
        username: "",
        password: "",
      });
    } catch (error) {
      if (error) {
        setMessage("Login failed. Please check your credentials.");
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
          height: 537,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: 1,
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#212427", mb: 2, fontWeight: "bold" }}
        >
          Sign In
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
            title={!isFormComplete ? "Fill in all fields to login" : ""}
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
                  color: "#F8F9FB",
                  textTransform: "capitalize",
                  "&.Mui-disabled": {
                    backgroundColor: "#FF9090",
                    color: "#F8F9FB",
                    opacity: 1,
                    cursor: "not-allowed",
                  },
                }}
                disabled={!isFormComplete}
              >
                Log In
              </Button>
            </span>
          </Tooltip>
        </form>
        <Typography variant="body2" sx={{ mt: 2, color: "#212427" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{ color: "#008BD9", textDecoration: "none" }}
          >
            Create One
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
