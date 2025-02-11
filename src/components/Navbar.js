import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import LogOut from "./LogOut";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Add Books", path: "/books/add" },
    { text: "Orders", path: "/books/orders" },
  ];

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(135deg, #1976D2, #0D47A1)",
          boxShadow: 4,
        }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
        >
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              "&:hover": { opacity: 0.8 },
            }}
          >
            📚 Book Store
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Button
                  component={Link}
                  to={item.path}
                  sx={{
                    color: "#fff",
                    fontSize: "16px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "8px",
                    },
                  }}
                >
                  {item.text}
                </Button>
              </motion.div>
            ))}
          </Box>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <LogOut />
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, py: 2 }}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                button
                key={index}
                component={Link}
                to={item.path}
                onClick={toggleDrawer}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
