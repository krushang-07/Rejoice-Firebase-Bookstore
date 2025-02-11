import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { Typography, Container } from "@mui/material";
import OrderCard from "../components/OrderCard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";

const ViewOrderDetail = () => {
  const { id } = useParams();
  const { getOrder } = useFirebase();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = useCallback(async () => {
    try {
      const orderData = await getOrder(id);
      setOrder(orderData || []);
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  }, [id, getOrder]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  if (loading) return <Loader />;

  if (!order || order.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h5" align="center" color="error">
          Order not found!
        </Typography>
      </motion.div>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <OrderCard totalOrder={order.length} order={order} />
      </motion.div>
    </Container>
  );
};

export default ViewOrderDetail;
