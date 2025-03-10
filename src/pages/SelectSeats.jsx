import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SelectSeats() {
    const { busId } = useParams();
    const [numSeats, setNumSeats] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [passengerDetails, setPassengerDetails] = useState({});
    const [bus, setBus] = useState(null);
    const [totalFare, setTotalFare] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/buses/${busId}`)
            .then((response) => setBus(response.data))
            .catch((error) => console.error("Error fetching bus details:", error));

        fetchBookedSeats();
    }, [busId]);

    const fetchBookedSeats = () => {
        axios.get(`http://localhost:8080/api/booking/booked-seats?busId=${busId}`)
            .then((response) => setBookedSeats(response.data))
            .catch((error) => console.error("Error fetching booked seats:", error));
    };

    useEffect(() => {
        if (bus) {
            setTotalFare(selectedSeats.length * bus.fare);
        } else {
            setTotalFare(0);
        }
    }, [selectedSeats, bus]);

    const handleNumSeatsChange = (e) => {
        const count = parseInt(e.target.value);
        setNumSeats(count);
        setSelectedSeats([]);
        setPassengerDetails({});
    };

    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) return;

        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seat)) {
                const updatedSeats = prevSelected.filter((s) => s !== seat);
                setPassengerDetails((prevDetails) => {
                    const updatedDetails = { ...prevDetails };
                    delete updatedDetails[seat];
                    return updatedDetails;
                });
                return updatedSeats;
            } else {
                if (prevSelected.length < numSeats) {
                    return [...prevSelected, seat];
                } else {
                    alert(`You can only select ${numSeats} seat(s).`);
                    return prevSelected;
                }
            }
        });
    };

    const handleInputChange = (seat, field, value) => {
        setPassengerDetails((prevDetails) => ({
            ...prevDetails,
            [seat]: { ...prevDetails[seat], [field]: value },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bus) {
            alert("Bus details not found.");
            return;
        }

        if (selectedSeats.length !== numSeats) {
            alert(`Please select exactly ${numSeats} seat(s).`);
            return;
        }

        const passengers = selectedSeats.map(seat => ({
            name: passengerDetails[seat]?.name,
            age: passengerDetails[seat]?.age,
            email: passengerDetails[seat]?.email,
        }));

        const bookingRequest = {
            busId: bus.id,
            seatNumbers: selectedSeats,
            passengers: passengers,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/booking/book", bookingRequest);
            alert(response.data); // Show success message from backend
            setSelectedSeats([]);
            setPassengerDetails({});
            fetchBookedSeats(); // Refresh booked seats from backend
        } catch (error) {
            console.error("Error booking seats:", error);
            alert("Failed to book seats. Please try again.");
        }
    };

    if (!bus) {
        return <div>Loading bus details...</div>;
    }

    return (
        <div className="container">
            <h1>Bus Seat Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>Select Number of Seats: </label>
                <select value={numSeats} onChange={handleNumSeatsChange}>
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>

                <h3>Select Your Seats:</h3>
                <div className="seat-grid">
                    {Array.from({ length: bus.seats }, (_, i) => i + 1).map((seat) => (
                        <button
                            key={seat}
                            type="button"
                            className={`seat-button ${bookedSeats.includes(seat) ? "seat-booked" : selectedSeats.includes(seat) ? "seat-selected" : "seat-available"}`}
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
                        <input type="text" placeholder="Name" value={passengerDetails[seat]?.name || ""} onChange={(e) => handleInputChange(seat, "name", e.target.value)} required />
                        <input type="number" placeholder="Age" value={passengerDetails[seat]?.age || ""} onChange={(e) => handleInputChange(seat, "age", e.target.value)} required />
                        <input type="email" placeholder="Email" value={passengerDetails[seat]?.email || ""} onChange={(e) => handleInputChange(seat, "email", e.target.value)} required />
                    </div>
                ))}

                <h3>Total Fare: ₹{totalFare}</h3>

                <button type="submit">Book Seats</button>
            </form>
        </div>
    );
}

export default SelectSeats;