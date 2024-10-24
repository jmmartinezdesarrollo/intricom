"use client";

import { useEffect, useState } from "react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const fetchClients = async () => {
    const response = await fetch("/api/clients");
    const data = await response.json();
    setClients(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, address, phone }), // Se incluye el teléfono aquí
    });

    if (response.ok) {
      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]);
      setName("");
      setAddress("");
      setPhone(""); // Resetea el campo de teléfono
    } else {
      console.error("Error al crear el cliente");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clients.length === 0 ? (
          <p>No hay clientes disponibles.</p>
        ) : (
          clients.map((client) => (
            <li key={client.id}>
              {client.name} - {client.address} - {client.phone}
            </li>
          ))
        )}
      </ul>

      <h2>Agregar Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Agregar Cliente</button>
      </form>
    </div>
  );
}
