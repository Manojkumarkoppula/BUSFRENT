import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

function TicketPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;
    const ticketRef = useRef(null); // Reference to ticket content

    if (!bookingData) {
        return <h2>No ticket found! Redirecting...</h2>;
    }

    // Function to download ticket as PDF
    const downloadTicketPDF = () => {
        const input = ticketRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, mm units, A4 size
            pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust dimensions
            pdf.save(`ticket-${bookingData.busId}.pdf`);

            // Navigate to the search page after download
            setTimeout(() => navigate("/search"), 1000);
        });
    };

    return (
        <div>
            <div ref={ticketRef} style={{ padding: "20px", border: "1px solid #000", width: "fit-content" }}>
                <h1>Ticket Confirmation</h1>
                <h2>Bus ID: {bookingData.busId}</h2>
                <h3>Total Fare: ${bookingData.totalFareAmount}</h3>

                <h3>Passengers:</h3>
                <ul>
                    {bookingData.bookingdetails.map((passenger, index) => (
                        <li key={index}>
                            {passenger.name} - Seat {passenger.seatNumber}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Button to Download Ticket as PDF */}
            <button onClick={downloadTicketPDF}>Download PDF</button>
        </div>
    );
}

export default TicketPage;
