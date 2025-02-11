import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useFirebase } from "../context/FirebaseContext";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

const AddBooks = () => {
  const { createNewBookList } = useFirebase();
  const [bookData, setBookData] = useState({
    name: "",
    isbn: "",
    price: "",
    coverPhoto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBookData({ ...bookData, coverPhoto: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewBookList(
      bookData.name,
      bookData.isbn,
      bookData.price,
      bookData.coverPhoto
    );
    toast.success("📚 Book Added Successfully!");
    setBookData({ name: "", isbn: "", price: "", coverPhoto: "" });
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={6}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            background: "linear-gradient(to right, #ece9e6, #ffffff)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            📖 Add a New Book
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Book Name"
              name="name"
              value={bookData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="ISBN Number"
              name="isbn"
              value={bookData.isbn}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Price (₹)"
              name="price"
              type="number"
              value={bookData.price}
              onChange={handleChange}
              required
            />
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" component="label">
                Upload Cover Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Button>
            </Box>

            {bookData.coverPhoto && (
              <Box sx={{ mt: 2 }}>
                <img
                  src={bookData.coverPhoto}
                  alt="Book Cover"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            )}

            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
              type="submit"
            >
              Add Book 📚
            </Button>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default AddBooks;
