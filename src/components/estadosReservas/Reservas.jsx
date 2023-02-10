import React from "react";
import "./EstadosReservas.css";

function acortarDireccion(direccion) {
  return (
    direccion.substring(0, 6) +
    "..." +
    direccion.substring(direccion.length - 4)
  );
}

export default function Stats({ stats, getStats, comprarReserva }) {
  return (
    <div className="estado-form-container">
      <div>
        <h3>Lista de Posiciones en la Lista</h3>
        <div className="reserva-table">
          <div className="reserva-row1">
            <div className="reserva-header">Posición</div>
            <div className="reserva-header">Dueño</div>
            <div className="reserva-header">Precio de venta</div>
            <div className="reserva-header">Colocar ETH al que desea Vender</div>
            <div className="reserva-header2">Compra de Reserva</div>
          </div>
          {stats && stats.length > 0 ? (
            stats.map((reserva) => (
              <div className="reserva-row" key={reserva.idReserva}>
                <div className="reserva-column">{reserva.idReserva}</div>
                <div className="reserva-column">
                  {reserva.dueno ? acortarDireccion(reserva.dueno) : null}
                </div>
                <div className="reserva-column">{reserva.precioVenta}</div>
                <div className="reserva-column">
                  <input
                    className="estado-input"
                    type="text"
                    placeholder="Ingrese nuevo $ de venta"
                    id="_nuevoPrecioVenta"
                  />
                </div>
                <div className="reserva-column">
                  <button
                    className="estado-button"
                    onClick={() =>
                      comprarReserva(
                        reserva.idReserva,
                        reserva.precioVenta,
                        document.getElementById("_nuevoPrecioVenta").value
                      )
                    }
                  >
                    Comprar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="reserva-row">
              <div className="reserva-column">No hay reservas para mostrar</div>
            </div>
          )}
        </div>
        <div className="get">
          <button onClick={getStats} className="estado-button2">
            Get Stats
          </button>
        </div>
      </div>
    </div>
  );
}
