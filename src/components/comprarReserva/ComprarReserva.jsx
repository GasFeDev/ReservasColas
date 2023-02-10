import React, { useState } from "react";
import "./ComprarReserva.css";

export default function ComprarReserva({ comprarReserva }) {
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
    comprarReserva(
      form._idReserva,
      form._nombre,
      form._apellido,
      form._dni,
      form._precioVenta
    );
  };

  return (
    <div className="compra-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="_idReserva" className="compra-label">
          Posición
        </label>
        <input
          type="text"
          id="_idReserva"
          name="_idReserva"
          value={form._idReserva}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="_nombre" className="compra-label">
          Nombre:
        </label>
        <input
          type="text"
          id="_nombre"
          name="_nombre"
          value={form._nombre}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="_apellido" className="compra-label">
          Apellido:
        </label>
        <input
          type="text"
          id="_apellido"
          name="_apellido"
          value={form._apellido}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="_dni" className="compra-label">
          DNI:
        </label>
        <input
          type="text"
          id="_dni"
          name="_dni"
          value={form._dni}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="_precioVenta" className="compra-label">
          Precio de Venta:
        </label>
        <input
          type="text"
          id="_precioVenta"
          name="_precioVenta"
          value={form._precioVenta}
          onChange={handleChange}
        />
        <br />
        <button onClick={handleBuy} className="compra-button">
          Comprar Reserva
        </button>
      </form>
    </div>
  );
}
