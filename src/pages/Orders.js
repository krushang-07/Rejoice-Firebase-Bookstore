import React, { useCallback, useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import BookCard from "../components/BookCard";
import { Container, Grid, Typography, Box } from "@mui/material";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Orders = () => {
  const { fetchMyBooks, user } = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const fetchedBooks = await fetchMyBooks();
      console.log("Fetched Books:", fetchedBooks);
      setBooks(fetchedBooks ?? []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [user, fetchMyBooks]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ mt: 5, overflowX: "hidden" }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ overflow: "hidden" }}
      >
        <Typography sx={{ mb: 5 }} variant="h4" fontWeight="bold" gutterBottom>
          📚 My Books
        </Typography>

        {books.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
              alt="No Books"
              width="200"
              style={{ opacity: 0.7 }}
            />
            <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
              No books found in your orders.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={5}>
            {books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={book.id}
                component={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <BookCard link={`/books/orders/${book.id}`} book={book} />
              </Grid>
            ))}
          </Grid>
        )}
      </motion.div>
    </Container>
  );
};

export default Orders;
