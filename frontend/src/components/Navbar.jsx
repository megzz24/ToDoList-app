import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname === "/dashboard") {
      return "Dashboard";
    }
    return "To-Do";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#F8F8F8",
        boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
        zIndex: 1, // ensure it stays above Sidebar
        height: "100px", // fixed height
        justifyContent: "center", // vertical alignment
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%", // make Toolbar fill AppBar height
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ color: "#FF6767", fontWeight: "bold", ml: "50px" }}
          >
            {getTitle()}
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            mx: { xs: "50px", md: "150px" },
            backgroundColor: "#ffffff",
            borderRadius: 2,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            px: 2,
            py: 0.5,
          }}
        >
          <InputBase
            placeholder="Search..."
            fullWidth
            sx={{ color: "#333" }}
            endAdornment={
              <InputAdornment position="end" sx={{ mr: -2 }}>
                <Box
                  sx={{
                    backgroundColor: "#FF6767",
                    borderRadius: 2,
                    padding: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    py: 1,
                  }}
                >
                  <SearchIcon sx={{ color: "#FFFFFF" }} />
                </Box>
              </InputAdornment>
            }
          />
        </Box>

        <Box sx={{ textAlign: "right", mr: "50px" }}>
          <Typography
            variant="body1"
            sx={{ color: "#000000", fontWeight: "bold" }}
          >
            {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </Typography>

          <Typography variant="body2" sx={{ color: "#3ABEFF" }}>
            {new Date().toLocaleDateString("en-GB")}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
