import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const OrderCard = ({ order, totalOrder }) => {
  return (
    <div>
      <Typography variant="h5" fontWeight="bold" align="center">
        Order Details
      </Typography>
      <Typography
        variant="subtitle1"
        fontWeight="bold"
        align="center"
        sx={{ mt: 1 }}
      >
        Total Orders: {totalOrder}
      </Typography>

      {order.map((o, index) => (
        <motion.div
          key={o.id || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card
            component={motion.div}
            whileHover={{ scale: 1.05 }}
            sx={{ boxShadow: 5, borderRadius: 4, p: 3, my: 2 }}
          >
            <CardContent>
              <Typography variant="body1" sx={{ mt: 1 }}>
                <strong>Order ID:</strong> {o.id}
              </Typography>
              <Typography variant="body1">
                <strong>Quantity:</strong> {o.qty ?? "N/A"}
              </Typography>
              <Typography variant="body1">
                <strong>User Email:</strong> {o.userEmail ?? "N/A"}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default OrderCard;
