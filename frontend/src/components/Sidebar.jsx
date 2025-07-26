import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        width: "220px",
        height: "calc(100vh - 150px)",
        backgroundColor: "#FF6767",
        position: "fixed",
        top: "100px",
        left: 0,
        zIndex: 1,
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.1)",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        color: "#ffffff",
        "& .MuiTypography-root": {
          fontSize: "20px",
        },
      }}
    >
      <List>
        <ListItem button onClick={() => navigate("/dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>

      <Box>
        <List>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
