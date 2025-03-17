import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import style5 from '../Styles/search.module.css';

function SearchBuses() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [buses, setBuses] = useState([]);
  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8080/api/buses/search?source=${source}&destination=${destination}&date=${date}`
    ).then(response => response.json())
    .then(data => setBuses(data));
  };

  const handleSelectSeats = (busId) => {
    navigate(`/select-seats/${busId}`);
  };

  return (
    <div className={style5['search-buses-container']}>
      <h2><span style={{color:"orange"}}>Search</span> Buses</h2><br/><br/>
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
          min={minDate} 
          onChange={(e) => setDate(e.target.value)}
          required

        />
        <button type="submit" className={style5['gradient-button']}>Search</button>
      </form>
      <div className={style5['bus-results']}>
        {buses.length > 0 ? (
          <table className={style5['bus-table']}>
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Fare</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Starting Time</th>
                <th>Departure Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {buses.map((bus) => (
                <tr key={bus.id}>
                  <td>{bus.busNumber}</td>
                  <td>{bus.fare}</td>
                  <td>{bus.source}</td>
                  <td>{bus.destination}</td>
                  <td>{bus.startingTime}</td>
                  <td>{bus.departureDate}</td>
                  <td>
                    <button onClick={() => handleSelectSeats(bus.id)} className={style5['gradient-button']}>
                      Select Seats
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Buses found:</p>
        )}
      </div>
    </div>
  );
}

export default SearchBuses;