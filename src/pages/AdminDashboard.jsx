import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style2 from '../Styles/admin.module.css'; // Import the CSS module

function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [newBus, setNewBus] = useState({
    busNumber: "",
    name: "",
    seats: '',
    fare: '',
    source: "",
    destination: "",
    startingTime: "",
    departureDate: ""
  });
  const navigate = useNavigate();

  const changevalue = (e) => {
    setNewBus({ ...newBus, [e.target.name]: e.target.value.toUpperCase() });
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    const response = await axios.get("http://localhost:8080/api/buses");
    setBuses(response.data);
  };

  const handleAddBus = async () => {
    await axios.post("http://localhost:8080/api/buses", newBus)
      .then(() => {
        alert('Added successfully');
        fetchBuses(); // Refresh the bus list after adding a new bus
      });
  };

  const handleDeleteBus = async (id) => {
    await axios.delete(`http://localhost:8080/api/buses/${id}`)
      .then(() => {
        alert('Deleted successfully');
        fetchBuses(); // Refresh the bus list after deleting a bus
      });
  };

  return (
    <div className={style2.dashboardContainer}>
      <h2 className={style2.dashboardHeading}>Admin Dashboard</h2>

      <div className={style2.addBusSection}>
        <h3>Add New Bus</h3>
        <div className={style2.inputGroup}>
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
        </div>
        <button className={style2.addButton} onClick={handleAddBus}>Add Bus</button>
      </div>

      <div className={style2.manageBusesSection}>
        <h3>Manage Buses</h3>
        <table className={style2.busTable}>
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Bus Name</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Starting Time</th>
              <th>Departure Date</th>
              <th>Fare</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus.id}>
                <td>{bus.busNumber}</td>
                <td>{bus.name}</td>
                <td>{bus.source}</td>
                <td>{bus.destination}</td>
                <td>{bus.startingTime}</td>
                <td>{bus.departureDate}</td>
                <td>{bus.fare}</td>
                <td>{bus.seats}</td>
                <td>
                  <button className={style2.deleteButton} onClick={() => handleDeleteBus(bus.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;