import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function SelectSeats() {
    const { busId } = useParams();
    const navigate = useNavigate(); // For navigation to payment page

    const [bus, setBus] = useState(null);
    const [totalSeats, setTotalSeats] = useState(0);
    const [numSeats, setNumSeats] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [passengerDetails, setPassengerDetails] = useState({});
    const [farePerSeat, setFarePerSeat] = useState(600);

    const totalFareAmount = selectedSeats.length * farePerSeat;

    // Fetch bus details
    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/buses/${busId}`);
                setBus(response.data);
                setFarePerSeat(response.data.fare);
                setTotalSeats(response.data.seats);
            } catch (error) {
                console.error("Error fetching bus details:", error);
            }
        };
        fetchBusDetails();
    }, [busId]);

    // Fetch booked seats
    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${busId}`);
                console.log("API Response:", response.data); // Debug API response
                
                if (response.data && Array.isArray(response.data)) {
                    const booked = response.data.map((booking) => booking.seatNumber);
                    setBookedSeats(booked);
                } else {
                    console.error("Invalid API response format:", response.data);
                    setBookedSeats([]);
                }
            } catch (error) {
                console.error("Error fetching booked seats:", error);
                setBookedSeats([]);
            }
        };
        fetchBookedSeats();
    }, [busId]);

    // Handle seat selection
    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) return; // Prevent selecting booked seats
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
            const updatedDetails = { ...passengerDetails };
            delete updatedDetails[seat];
            setPassengerDetails(updatedDetails);
        } else {
            if (selectedSeats.length < numSeats) {
                setSelectedSeats([...selectedSeats, seat]);
            } else {
                alert(`You can only select ${numSeats} seat(s).`);
            }
        }
    };

    // Handle passenger input
    const handleInputChange = (seat, field, value) => {
        setPassengerDetails({
            ...passengerDetails,
            [seat]: { ...passengerDetails[seat], [field]: value },
        });
    };

    // Handle booking submission & navigate to payment
    const handleProceedToPayment = async (e) => {
        e.preventDefault();
        if (selectedSeats.length !== numSeats) {
            alert(`Please select exactly ${numSeats} seat(s).`);
            return;
        }

        for (let seat of selectedSeats) {
            const details = passengerDetails[seat];
            if (!details || !details.name || !details.age || !details.email || !details.phone) {
                alert(`Please fill in all details for Seat ${seat}`);
                return;
            }
        }

        const bookingData = {
            busId: busId,
            totalFareAmount: totalFareAmount,
            bookingDetails: selectedSeats.map((seat) => ({ 
                seatNumber: seat,
                name: passengerDetails[seat].name,
                age: passengerDetails[seat].age,
                email: passengerDetails[seat].email,
                phone: passengerDetails[seat].phone,
            })),
        };

        // Navigate to payment page with booking data
        navigate("/payment", { state: { bookingData } });
    };

    return (
        <div className="container">
            <h1>Bus Seat Booking</h1>
            <h2>Bus ID: {busId}</h2>
            <h2>Fare per seat:₹ {farePerSeat}</h2>
            <h2>Total Fare:₹ {totalFareAmount}</h2>

            <form onSubmit={handleProceedToPayment}>
                <label>Select Number of Seats: </label>
                <select value={numSeats} onChange={(e) => setNumSeats(parseInt(e.target.value))}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                <h3>Select Your Seats:</h3>
                <div className="seat-grid">
                    {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => (
                        <button
                            key={seat}
                            type="button"
                            className={`seat-button ${
                                bookedSeats.includes(seat) ? "seat-booked" :
                                selectedSeats.includes(seat) ? "seat-selected" :
                                "seat-available"
                            }`}
                            onClick={() => handleSeatClick(seat)}
                            disabled={bookedSeats.includes(seat)}
                        >
                            {seat}
                        </button>
                    ))}
                </div>

                <h3>Enter Passenger Details:</h3>
                {selectedSeats.map((seat) => (
                    <div key={seat} className="passenger-details">
                        <h4>Seat {seat}</h4>
                        <input
                            type="text"
                            placeholder="Name"
                            value={passengerDetails[seat]?.name || ""}
                            onChange={(e) => handleInputChange(seat, "name", e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Age"
                            value={passengerDetails[seat]?.age || ""}
                            onChange={(e) => handleInputChange(seat, "age", e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={passengerDetails[seat]?.email || ""}
                            onChange={(e) => handleInputChange(seat, "email", e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={passengerDetails[seat]?.phone || ""}
                            onChange={(e) => handleInputChange(seat, "phone", e.target.value)}
                            required
                        />
                    </div>
                ))}

                <button type="submit">Proceed to Payment</button>
            </form>
        </div>
    );
}

export default SelectSeats;
