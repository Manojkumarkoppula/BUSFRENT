import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    busNumber: "",
    name:"",
    seats: '',
    fare: '',
    source: "",
    destination: "",
    startingTime: "",
    departureDate: ""
  });
  const navigate = useNavigate();

  const changevalue = (e) => {
    setNewBus({ ...newBus, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
   
    const response = await axios.get("http://localhost:8080/api/buses");
    setBuses(response.data);
      
  };

  const handleAddBus = async () => {
      await axios.post("http://localhost:8080/api/buses", newBus,)
      .then(alert('added sucesfully'))    
  };

  const handleDeleteBus = async (id) => {
    
      await axios.delete(`http://localhost:8080/api/buses/${id}`)
      .then(alert('deleted sucessfully'))
      
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Add New Bus</h3>
      <div>
          <input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            value={newBus.busNumber}
            onChange={changevalue}
          />
          <input
            type="text"
            name="name"
            placeholder="Bus Name"
            value={newBus.name}
            onChange={changevalue}
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={newBus.source}
            onChange={changevalue}
          />
          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={newBus.destination}
            onChange={changevalue}
          />
          <input
            type="time"
            name="startingTime"
            placeholder="Starting Time"
            value={newBus.startingTime}
            onChange={changevalue}
          />
          <input
            type="date"
            name="departureDate"
            placeholder="Departure Date"
            value={newBus.departureDate}
            onChange={changevalue}
          />
          <input
            type="number"
            name="fare"
            placeholder="Fare"
            value={newBus.fare}
            onChange={changevalue}
          />
          <input
            type="number"
            name="seats"
            placeholder="Seats"
            value={newBus.seats}
            onChange={changevalue}
          />
          <button onClick={handleAddBus}>Add Bus</button>
      </div>

      <h3>Manage Buses</h3>
      <ul>
        {buses.map((bus) => (
          <li key={bus.id}>
            Bus Number: {bus.busNumber} - Seats: {bus.seats} - Fare: {bus.fare}{" "}
            - Source: {bus.source} - Destination: {bus.destination} - Starting
            Time: {bus.startingTime} - Departure Date: {bus.departureDate}
            <button onClick={() => handleDeleteBus(bus.id)}>Delete</button>
          </li>
        ))}
      </ul>

     
      
    </div>
  );
}

export default AdminDashboard;