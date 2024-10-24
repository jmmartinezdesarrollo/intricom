"use client";

import { useEffect, useState } from "react";

export default function HotelBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [clients, setClients] = useState([]);
  const [hotelId, setHotelId] = useState(0);
  const [clientId, setClientId] = useState(0);

  const fetchBookings = async () => {
    const response = await fetch("/api/bookings");
    const data = await response.json();
    setBookings(data);
  };

  const fetchHotels = async () => {
    const response = await fetch("/api/hotels");
    const data = await response.json();
    setHotels(data);
  };

  const fetchClients = async () => {
    const response = await fetch("/api/clients");
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotelId: parseInt(hotelId),
        clientId: parseInt(clientId),
      }),
    });

    if (response.ok) {
      const newBooking = await response.json();
      setBookings((prevBookings) => [...prevBookings, newBooking]);
      setHotelId(0);
      setClientId(0);
    } else {
      console.error("Error al crear la reserva");
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchHotels();
    fetchClients();
  }, []);

  return (
    <div>
      <h1>Lista de Reservas de Hoteles</h1>
      <ul>
        {bookings.length === 0 ? (
          <p>No hay reservas disponibles.</p>
        ) : (
          bookings.map((booking) => (
            <li key={booking.id}>
              Hotel ID: {booking.hotelId} - Cliente ID: {booking.clientId}
            </li>
          ))
        )}
      </ul>

      <h2>Agregar Nueva Reserva</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Hotel:
          <select
            value={hotelId}
            onChange={(e) => setHotelId(e.target.value)}
            required
          >
            <option value="0" disabled>
              Selecciona un hotel
            </option>
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cliente:
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
          >
            <option value="0" disabled>
              Selecciona un cliente
            </option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
        <div>
          <button type="submit">Reserva</button>
        </div>
      </form>
    </div>
  );
}
