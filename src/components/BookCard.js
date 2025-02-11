import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookCard = ({ book, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{ width: "100%", maxWidth: 350, margin: "auto" }}
    >
      <Card
        sx={{
          boxShadow: 5,
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(to bottom, #f8fafc, #e2e8f0)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: 10,
          },
        }}
      >
        <CardMedia
          component="img"
          height="400"
          image={book.coverPhoto}
          alt="Book Cover"
          sx={{
            objectFit: "cover",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        />
        <CardContent sx={{ textAlign: "center", p: 3 }}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            {book.name.toUpperCase()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ISBN: <strong>{book.isbn}</strong>
          </Typography>
          <Typography variant="body1" fontWeight="bold" color="green">
            Price: ₹{book.price}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Uploaded by: {book.userEmail}
          </Typography>

          <Box mt={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                  backgroundColor: "#ff7043",
                },
              }}
              onClick={() => navigate(link)}
            >
              View Details
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default BookCard;
