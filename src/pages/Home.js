import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { Grid, Typography, Container } from "@mui/material";
import BookCard from "../components/BookCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const Home = () => {
  const { listAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const booksData = await listAllBooks();
      setBooks(booksData);
      setLoading(false);
    };

    fetchBooks();
  }, [listAllBooks]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          sx={{ mb: 2 }}
        >
          Welcome to BooksHub 📚
        </Typography>

        <Typography
          variant="h5"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Explore a collection of amazing books!
        </Typography>
      </motion.div>

      {loading ? (
        <Loader />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={4} justifyContent="center">
            {books.map((book) => (
              <Grid item key={book.id} xs={12} sm={6} md={4} lg={3}>
                <BookCard link={`/books/view/${book.id}`} book={book} />
              </Grid>
            ))}
          </Grid>
        </motion.div>
      )}
    </Container>
  );
};

export default Home;
