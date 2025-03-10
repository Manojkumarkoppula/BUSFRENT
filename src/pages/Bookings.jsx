import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function Bookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings", error));
  }, []);

  const handleCancelBooking = async (bookingId) => {
    try {
      await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      alert("Booking cancelled successfully!");
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking", error);
    }
  };

  return (
    <div className="bookings-container">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-item">
              <p>Bus: {booking.busId}</p>
              <p>Seats: {booking.seats.join(", ")}</p>
              <button onClick={() => handleCancelBooking(booking.id)}>
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/search")}>Book More</button>
    </div>
  );
}

export default Bookings;
