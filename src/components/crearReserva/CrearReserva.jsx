import React, { useState } from "react";
import "./CrearReserva.css";

export default function CrearReserva({ crearReserva }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBuy = () => {
    crearReserva(form._nombre, form._apellido, form._dni);
  };

  return (
    <div className="reserva-form-container">
      <div>
        <h1>Conectese con su wallet</h1>
        <h4>
          Para poder participar necesita tener una wallet basada en la
          Blockchain de Ethereum
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>El costo de aquirir una plaza es de 0.0001 ETH</h3>
        <label htmlFor="_nombre" className="reserva-label">
          Nombre:
        </label>
        <input
          type="text"
          id="_nombre"
          name="_nombre"
          value={form._nombre}
          onChange={handleChange}
          className="reserva-input"
        />
        <br />
        <label htmlFor="_apellido" className="reserva-label">
          Apellido:
        </label>
        <input
          type="text"
          id="_apellido"
          name="_apellido"
          value={form._apellido}
          onChange={handleChange}
          className="reserva-input"
        />
        <br />
        <label htmlFor="_dni" className="reserva-label">
          DNI:
        </label>
        <input
          type="text"
          id="_dni"
          name="_dni"
          value={form._dni}
          onChange={handleChange}
          className="reserva-input"
        />
        <br />
        <button onClick={handleBuy} className="reserva-button">
          Crear Reserva
        </button>
      </form>
      <div className="porcentaje">
        <button className="porcentaje">25%</button>
        <label className="lista">Insertando en la lista</label>
      </div>
    </div>
  );
}
