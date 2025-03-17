import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import style8 from "../Styles/ticket.module.css";

function TicketPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;
    const ticketRef = useRef(null);

    if (!bookingData) {
        return <h2>No ticket found! Redirecting...</h2>;
    }

    // ✅ Generate PDF without QR Code
    const generatePDF = () => {
        const pdf = new jsPDF();
        pdf.setFont("helvetica", "bold");
        
        // Title
        pdf.setFontSize(22);
        pdf.text("Bus Ticket Confirmation", 50, 20);

        // Bus ID
        pdf.setFontSize(16);
        pdf.text(`Bus ID: ${bookingData.busId}`, 20, 40);

        // Fare
        pdf.setFontSize(14);
        pdf.text(`Total Fare: ₹${bookingData.totalFareAmount}`, 20, 50);

        // Passenger List
        pdf.setFontSize(14);
        pdf.text("Passengers:", 20, 60);

        let yPosition = 70;
        bookingData.bookingdetails.forEach((passenger, index) => {
            pdf.text(`${index + 1}. ${passenger.name} - Seat ${passenger.seatNumber}`, 30, yPosition);
            yPosition += 10;
        });

        pdf.save(`ticket-${bookingData.busId}.pdf`);

        setTimeout(() => navigate("/search"), 1000);
    };

    return (
        <div className={style8.ticketContainer}>
            <div ref={ticketRef} className={style8.ticketDetails}>
                <div className={style8.ticketHeader}>Ticket Confirmation</div>
                <h2>Bus ID: {bookingData.busId}</h2>
                <h3>Total Fare: ₹{bookingData.totalFareAmount}</h3>
                <h3>Passengers:</h3>
                <ul className={style8.passengerList}>
                    {bookingData.bookingdetails.map((passenger, index) => (
                        <li key={index} className={style8.passengerItem}>
                            {passenger.name} - Seat {passenger.seatNumber}
                        </li>
                    ))}
                </ul>
            </div>
            <button className={style8.downloadButton} onClick={generatePDF}>Download PDF</button>
        </div>
    );
}

export default TicketPage;
