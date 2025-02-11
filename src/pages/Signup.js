import React, { useEffect, useState } from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signupWithEmailAndPassword, signupWithGoogle, isLoggedIn } =
    useFirebase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signupWithEmailAndPassword(email, password);
      toast.success("Signup successful! 🎉");
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signupWithGoogle();
      toast.success("Google signup successful! 🚀");
    } catch (err) {
      toast.error("Google signup failed. Try again!");
    }
  };

  return (
    <Container maxWidth="xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box
          sx={{
            mt: 5,
            p: 4,
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign Up 🚀
          </Typography>
          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#4CAF50",
                color: "#fff",
                "&:hover": { backgroundColor: "#388E3C" },
              }}
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <Divider sx={{ my: 2 }}>OR</Divider>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#DB4437",
                color: "#fff",
                "&:hover": { backgroundColor: "#C1351D" },
              }}
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignup}
            >
              Sign Up with Google
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Signup;
