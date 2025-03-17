import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import style7 from '../Styles/payment.module.css'; // Import the CSS module

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const bookingData = location.state?.bookingData || null;

    useEffect(() => {
        if (!bookingData) {
            setError("No booking data found! Redirecting...");
            setTimeout(() => navigate("/"), 3000);
        } else {
            setIsLoading(false);
        }
    }, [bookingData, navigate]);

    const formatBookingData = () => {
        if (!bookingData || !bookingData.bookingDetails) {
            return null;
        }

        return {
            busId: bookingData.busId || "BUS123",
            totalFareAmount: bookingData.totalFareAmount || 500.0,
            bookingdetails: bookingData.bookingDetails.map((passenger) => ({
                seatNumber: passenger.seatNumber,
                name: passenger.name,
                age: passenger.age,
                email: passenger.email || "unknown@example.com",
                phone: passenger.phone || "0000000000",
            })),
        };
    };

    const handlePayment = async () => {
        const formattedBookingData = formatBookingData();
        if (!formattedBookingData) {
            setError("Invalid booking data!");
            return;
        }

        try {
            alert("Payment successful!");

            await axios.post("http://localhost:8080/api/bookings", formattedBookingData, {
                headers: { "Content-Type": "application/json" },
            });

            navigate("/ticket", { state: { bookingData: formattedBookingData } });
        } catch (error) {
            console.error("Error saving booking:", error);
            setError("Payment failed. Please try again.");
        }
    };

    if (isLoading) return <h2 className={style7.loadingMessage}>Loading...</h2>;
    if (error) return <h2 className={style7.errorMessage}>{error}</h2>;

    return (
        <div className={style7.paymentContainer}>
            <h1 className={style7.amountsection1}>Payment Page</h1>
            <h2 className={style7.amountsection2}>Total Amount: ₹{bookingData?.totalFareAmount}</h2>

            <h3 style={{color:"white"}}>Passenger Details:</h3>
            <div className={style7.passengerList}>
                {bookingData?.bookingDetails?.map((passenger, index) => (
                    <div key={index} className={style7.passengerItem}>
                        <p><strong>Name:</strong> {passenger.name}</p>
                        <p><strong>Seat:</strong> {passenger.seatNumber}</p>
                        <p><strong>Age:</strong> {passenger.age}</p>
                        <p><strong>Email:</strong> {passenger.email}</p>
                        <p><strong>Phone:</strong> {passenger.phone}</p>
                    </div>
                ))}
            </div>

            <button className={style7.paymentButton} onClick={handlePayment}>Pay Now</button>
        </div>
    );
}

export default PaymentPage;
