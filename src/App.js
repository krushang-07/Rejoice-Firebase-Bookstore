import "./App.css";
import { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

const AddBooks = lazy(() => import("./pages/AddBooks"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const Details = lazy(() => import("./pages/Details"));
const Orders = lazy(() => import("./pages/Orders"));
const ViewOrderDetail = lazy(() => import("./pages/ViewOrderDetail"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/books/add" element={<AddBooks />} />
          <Route path="/books/view/:id" element={<Details />} />
          <Route path="/books/orders/:id" element={<ViewOrderDetail />} />
          <Route path="/books/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
