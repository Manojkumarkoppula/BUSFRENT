import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import style6 from '../Styles/seats.module.css';

function SelectSeats() {
    const { busId } = useParams();
    const navigate = useNavigate();

    const [bus, setBus] = useState(null);
    const [totalSeats, setTotalSeats] = useState(0);
    const [numSeats, setNumSeats] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [passengerDetails, setPassengerDetails] = useState({});
    const [farePerSeat, setFarePerSeat] = useState(600);

    const totalFareAmount = selectedSeats.length * farePerSeat;

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

    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/${busId}`);
                if (response.data && Array.isArray(response.data)) {
                    setBookedSeats(response.data.map((booking) => booking.seatNumber));
                } else {
                    setBookedSeats([]);
                }
            } catch (error) {
                setBookedSeats([]);
            }
        };
        fetchBookedSeats();
    }, [busId]);

    const handleSeatClick = (seat) => {
        if (bookedSeats.includes(seat)) return;
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

    const handleInputChange = (seat, field, value) => {
        setPassengerDetails({
            ...passengerDetails,
            [seat]: { ...passengerDetails[seat], [field]: value },
        });
    };

    const handleProceedToPayment = (e) => {
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

        navigate("/payment", { state: { bookingData } });
    };

    return (
        <div className={style6.maincontainer}>
            <div className={style6.businfomation}>
                <h1>Bus Seat Booking</h1>
                <h2>Bus ID: {busId}</h2>
                <h2>Fare per seat: ₹{farePerSeat}</h2>
                <h2>Total Fare: ₹{totalFareAmount}</h2>
            </div>

            <div className={style6.seatsection1}>
                <form onSubmit={handleProceedToPayment}>
                    <div className={style6.sideBySideContainer}>
                        <div className={style6.seatsection11}>
                            <label>Select Number of Seats: </label>
                            <select value={numSeats} onChange={(e) => setNumSeats(parseInt(e.target.value))}>
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>

                            <h3>Select Your Seats:</h3>
                            <div className={style6.seatgrid}>
                                {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seat) => {
                                    const colPosition = (seat % 4) || 4; // 1-4 for columns
                                    const rowPosition = Math.ceil(seat / 4); // Rows

                                    return (
                                        <button
                                            key={seat}
                                            type="button"
                                            className={`${style6.seatbutton} ${
                                                bookedSeats.includes(seat) ? style6.seatbooked :
                                                selectedSeats.includes(seat) ? style6.seatselected :
                                                style6.seatavailable
                                            }`}
                                            onClick={() => handleSeatClick(seat)}
                                            disabled={bookedSeats.includes(seat)}
                                            style={{
                                                gridColumn: colPosition === 1 ? 1 : colPosition === 2 ? 2 : colPosition === 3 ? 4 : 5,
                                                gridRow: rowPosition,
                                            }}
                                        >
                                            {seat}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={style6.seatsection12}>
                            <h3>Enter Passenger Details:</h3><br/>
                            {selectedSeats.map((seat) => (
                                <div key={seat} className={style6.passengerdetails}>
                                    <h4>Seat {seat}</h4>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={passengerDetails[seat]?.name || ""}
                                        onChange={(e) => handleInputChange(seat, "name", e.target.value)}
                                        required
                                    /><br/>
                                    <input
                                        type="number"
                                        placeholder="Age"
                                        value={passengerDetails[seat]?.age || ""}
                                        onChange={(e) => handleInputChange(seat, "age", e.target.value)}
                                        required
                                    /><br/>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={passengerDetails[seat]?.email || ""}
                                        onChange={(e) => handleInputChange(seat, "email", e.target.value)}
                                        required
                                    /><br/>
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={passengerDetails[seat]?.phone || ""}
                                        onChange={(e) => handleInputChange(seat, "phone", e.target.value)}
                                        required
                                    /><br/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className={style6.proceedbutton}>Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
}

export default SelectSeats;