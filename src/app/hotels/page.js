"use client";

import { useEffect, useState } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const fetchHotels = async () => {
    const response = await fetch("/api/hotels");
    const data = await response.json();
    setHotels(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/hotels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address }),
    });

    if (response.ok) {
      const newHotel = await response.json();
      setHotels((prevHotels) => [...prevHotels, newHotel]);
      setName("");
      setAddress("");
    } else {
      console.error("Error al crear el hotel");
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      <h1>Lista de Hoteles</h1>
      {hotels.length === 0 ? (
        <p>No hay hoteles disponibles.</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              {hotel.name} - {hotel.address}
            </li>
          ))}
        </ul>
      )}

      <h2>Crear Nuevo Hotel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del Hotel"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección del Hotel"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <button type="submit">Agregar Hotel</button>
      </form>
    </div>
  );
}
