import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function SearchBuses() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/buses/search?source=${source}&destination=${destination}&date=${date}`
    ).then(response=>response.json())
    .then(data=>setBuses(data))
  
  };

  const handleSelectSeats = (busId) => {
    navigate(`/select-seats/${busId}`);
  };

  return (
    <div className="search-buses-container">
      <h2>Search Buses</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className="bus-results">
        {buses.length > 0 ? (
          <ul>
            {buses.map((bus) => (
              <li key={bus.id}>
                Bus Number: {bus.busNumber} - Fare: {bus.fare}{" "}
            - Source: {bus.source} - Destination: {bus.destination} - Starting
            Time: {bus.startingTime} - Departure Date: {bus.departureDate}
                <button onClick={() => handleSelectSeats(bus.id)}>Select Seats</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No buses found</p>
        )}
      </div>
    </div>
  );
}

export default SearchBuses;
