import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { firebaseAuth } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      toast.success("User logged out successfully!!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout error!!");
    }
  };
  return (
    <div>
      <Button
        onClick={handleLogout}
        sx={{
          color: "#fff",
          fontSize: "16px",
          textTransform: "none",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "6px 16px",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.4)",
          },
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogOut;
