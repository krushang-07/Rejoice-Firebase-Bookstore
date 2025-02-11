import React, { useEffect, useState } from "react";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate, Link } from "react-router-dom";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginWithEmailAndPassword, signupWithGoogle, isLoggedIn } =
    useFirebase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmailAndPassword(email, password);
      toast.success("Login successful! 🚀");
    } catch (error) {
      toast.error("User not found! Redirecting to signup...");
      setTimeout(() => navigate("/signup"), 2000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signupWithGoogle();
      toast.success("Google login successful! 🎉");
    } catch (err) {
      toast.error("Google login failed. Try again!");
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
            Log In 🔐
          </Typography>
          <form onSubmit={handleSignIn}>
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
              Sign In
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
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
            </Button>
          </motion.div>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#1976D2", fontWeight: "bold" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Login;
