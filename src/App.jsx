import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchBuses from "./pages/SearchBuses";
import SelectSeats from "./pages/SelectSeats";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentPage from "./pages/PaymentPage";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <Router>
      <Layout /> {/* Wrapped inside Layout */}
    </Router>
  );
}

// Layout Component to handle Navbar visibility
function Layout() {
  const location = useLocation();
  
  // Hide Navbar on specific pages
  const hideNavbarPaths = ["/select-seats", "/payment", "/ticket"];
  const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideNavbar && <Navbar />} {/* Conditionally Render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchBuses />} />
        <Route path="/select-seats/:busId" element={<SelectSeats />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/ticket" element={<TicketPage />} />
      </Routes>
    </>
  );
}

export default App;
