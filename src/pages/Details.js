import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { Container, Grid, Typography, Button, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Details = () => {
  const { id } = useParams();
  const { getBookById, placeOrder } = useFirebase();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const fetchBookDetails = useCallback(async () => {
    try {
      const bookData = await getBookById(id);
      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  }, [id, getBookById]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  if (loading) return <Loader />;
  if (!book) {
    return (
      <Typography variant="h5" align="center" color="error">
        Book not found!
      </Typography>
    );
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handlePlaceOrder = async () => {
    if (isPlacingOrder) return;
    setIsPlacingOrder(true);
    try {
      await placeOrder(id, quantity);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order. Try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <motion.img
            src={book.coverPhoto}
            alt="Book Cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: "100%",
              maxHeight: 500,
              objectFit: "contain",
              borderRadius: 8,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            }}
          />
        </Grid>

        <Grid item xs={12} md={7}>
          <Typography variant="h4" fontWeight="bold">
            {book.name.toUpperCase()}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            ISBN: {book.isbn}
          </Typography>
          <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
            Price: ₹{book.price}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
            Uploaded by: {book.userEmail}
          </Typography>

          <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
            <Grid item>
              <Typography variant="body1" fontWeight="bold">
                Quantity:
              </Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={decreaseQuantity} color="primary">
                <Remove />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography variant="h6">{quantity}</Typography>
            </Grid>
            <Grid item>
              <IconButton onClick={increaseQuantity} color="primary">
                <Add />
              </IconButton>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ px: 3, py: 1 }}
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder}
                >
                  {isPlacingOrder
                    ? "Placing Order..."
                    : `Place Order (${quantity})`}
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Details;
