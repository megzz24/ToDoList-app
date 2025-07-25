// useState is a React hook to store and update values (like form inputs).
import React, { useState } from "react";

// axios is a library to send HTTP requests (e.g. to your Django backend).
import axios from "axios";

// Link: lets you move between pages without reloading.
// useNavigate: allows navigation using code (like redirecting after registration).
import { Link, useNavigate } from "react-router-dom";

// Material UI components for inputs, buttons, layout, etc.
import {
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tooltip,
} from "@mui/material";

// The RegisterForm component - this is your signup form
const RegisterForm = () => {
  // Store all form field values in the form state
  const [form, setForm] = useState({
    first_name: "",   // user's first name
    last_name: "",    // user's last name
    username: "",     // user's chosen username
    email: "",        // user's email address
    password: "",     // user's password
  });

  // message is used to show success or error messages to the user
  const [message, setMessage] = useState("");

  // errors will hold validation messages for each field (like "email is required")
  const [errors, setErrors] = useState({});

  // useNavigate allows us to redirect the user to another page using code
  const navigate = useNavigate();

  // handleChange updates the form state every time the user types into a field
  const handleChange = (e) => {
    // Keep existing form values, and update the one being changed
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleSubmit runs when the form is submitted
  const handleSubmit = async (e) => {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Clear old messages and errors before sending the form
    setMessage("");
    setErrors({});

    try {
      // Send form data to your Django backend using a POST request
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        form
      );

      // If successful, Django sends back access and refresh tokens
      const { access, refresh } = response.data;

      // Save tokens in localStorage so the user stays logged in
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // Show success message
      setMessage("Registration successful!");

      // (Optional) Redirect user to login or dashboard page:
      // navigate("/dashboard");
    } catch (error) {
      // If the backend returns errors, show them
      if (error.response && error.response.data) {
        setErrors(error.response.data.errors || {});
        setMessage(error.response.data.message || "Registration failed.");
      } else {
        // If something unexpected goes wrong
        setMessage("An unexpected error occurred.");
      }
    }
  };

  // isFormComplete checks if every form field has been filled in
  const isFormComplete = Object.values(form).every(
    (value) => value.trim() !== "" // trim removes empty spaces
  );

  return (
    // Outer box: takes full screen and centers the form
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
      {/* Inner box: white card that contains the form */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 400, // form will not grow larger than 400px
          p: 3,          // padding
          border: "1px solid #ccc",
          borderRadius: 2, // rounded corners
          boxShadow: 1,    // slight shadow
          backgroundColor: "#fff",
        }}
      >
        {/* Form title */}
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: "#212427", mb: 2, fontWeight: "bold" }}
        >
          Sign Up
        </Typography>

        {/* Show message if it exists — green for success, red for error */}
        {message && (
          <Alert
            severity={message.includes("successful") ? "success" : "error"}
          >
            {message}
          </Alert>
        )}

        {/* The actual signup form */}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Enter First Name"            // label above the input
            name="first_name"                   // used in form state
            value={form.first_name}             // current value from state
            onChange={handleChange}             // update on change
            fullWidth                           // take 100% width
            margin="normal"                     // vertical spacing
            error={!!errors.first_name}         // show red border if error
            // !!value converts any value into a boolean 
            helperText={                        // show error message below
              errors.first_name ? errors.first_name[0] : ""
            }
            sx={{ color: "#212427" }}           // input text color
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
            type="password"                    // hides characters for security
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password ? errors.password[0] : ""}
            sx={{ color: "#212427" }}
          />

          {/* Tooltip and button */}
          {/* If form is incomplete, tooltip shows a message and button is disabled */}
          <Tooltip
            title={!isFormComplete ? "Fill in all fields to register" : ""}
            placement="bottom"
            arrow
          >
            <span style={{ display: "inline-block" }}>
              <Button
                type="submit"                      // tells form to run handleSubmit
                variant="contained"               // solid button style
                width="10%"
                sx={{
                  mt: 2,                          // top margin
                  backgroundColor: "#FF9090",     // pink background
                  textTransform: "capitalize",    // don't uppercase the text
                  color: "#F8F9FB",               // white text
                  "&.Mui-disabled": {
                    backgroundColor: "#FF9090",   // same color if disabled
                    opacity: 1,
                    cursor: "not-allowed",        // show forbidden cursor
                    color: "#F8F9FB",
                  },
                }}
                disabled={!isFormComplete}        // disable if any field is empty
              >
                Register
              </Button>
            </span>
          </Tooltip>
        </form>

        {/* Link to login page if the user already has an account */}
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

// Export this component so it can be used in other parts of your app
export default RegisterForm;
