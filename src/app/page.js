"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [totalHotels, setTotalHotels] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  const fetchTotals = async () => {
    try {
      const hotelsResponse = await fetch("/api/hotels");
      const clientsResponse = await fetch("/api/clients");
      const bookingsResponse = await fetch("/api/bookings");

      if (!hotelsResponse.ok || !clientsResponse.ok || !bookingsResponse.ok) {
        throw new Error("Error fetching data");
      }

      const hotelsData = await hotelsResponse.json();
      const clientsData = await clientsResponse.json();
      const bookingsData = await bookingsResponse.json();

      setTotalHotels(hotelsData.length);
      setTotalClients(clientsData.length);
      setTotalBookings(bookingsData.length);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchTotals();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <br />
      <section className="info">
        <div className="card">
          <h2>Total Hoteles:</h2>
          <div className="circle">{totalHotels}</div>
        </div>

        <div className="card">
          <h2>Total Clientes:</h2>
          <div className="circle">{totalClients}</div>
        </div>
        <div className="card">
          <h2>Total Reservas:</h2>
          <div className="circle">{totalBookings}</div>
        </div>
      </section>
    </div>
  );
}
