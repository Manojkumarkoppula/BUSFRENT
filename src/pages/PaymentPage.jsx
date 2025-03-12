import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get `bookingData` safely
    const bookingData = location.state?.bookingData || null;

    // Check if `bookingData` exists
    useEffect(() => {
        if (!bookingData) {
            setError("No booking data found! Redirecting...");
            setTimeout(() => navigate("/"), 3000); // Redirect to home after 3 sec
        } else {
            setIsLoading(false);
        }
    }, [bookingData, navigate]);

    // Format Data for API
    const formatBookingData = () => {
        if (!bookingData || !bookingData.bookingDetails) {
            return null;
        }

        return {
            busId: bookingData.busId || "BUS123", // Use dynamic busId if available
            totalFareAmount: bookingData.totalFareAmount || 500.0, // Ensure total fare is set
            bookingdetails: bookingData.bookingDetails.map((passenger) => ({
                seatNumber: passenger.seatNumber,
                name: passenger.name,
                age: passenger.age,
                email: passenger.email || "unknown@example.com", // Default if missing
                phone: passenger.phone || "0000000000", // Default if missing
            })),
        };
    };

    // Handle Payment
    const handlePayment = async () => {
        const formattedBookingData = formatBookingData();
        if (!formattedBookingData) {
            setError("Invalid booking data!");
            return;
        }

        try {
            console.log("Formatted Booking Data:", formattedBookingData); // Debugging

            // Simulate payment success
            alert("Payment successful!");

            // Save booking to database
            await axios.post("http://localhost:8080/api/bookings", formattedBookingData, {
                headers: { "Content-Type": "application/json" },
            });

            // Navigate to ticket page
            navigate("/ticket", { state: { bookingData: formattedBookingData } });
        } catch (error) {
            console.error("Error saving booking:", error);
            setError("Payment failed. Please try again.");
        }
    };

    // Show loading or error
    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

    return (
        <div className="payment-container">
            <h1>Payment Page</h1>
            <h2>Total Amount: ${bookingData?.totalFareAmount}</h2>

            <h3>Passenger Details:</h3>
            <ul>
                {bookingData?.bookingDetails?.map((passenger, index) => (
                    <li key={index}>
                        {passenger.name} - Seat {passenger.seatNumber}
                    </li>
                ))}
            </ul>

            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
}

export default PaymentPage;
