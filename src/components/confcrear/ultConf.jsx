import React, { useEffect, useState, useCallback } from "react";
import "./confCrear.css";

export default function Stats({ stats, getStats }) {
  const [lastReservation, setLastReservation] = useState(
    JSON.parse(localStorage.getItem("lastReservation")) || {}
  );

  const getStatsCallback = useCallback(() => {
    getStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getStatsCallback();
  }, [getStatsCallback]);

  useEffect(() => {
    if (stats && stats.length > 0) {
      setLastReservation(stats[stats.length - 1]);
      localStorage.setItem(
        "lastReservation",
        JSON.stringify(stats[stats.length - 1])
      );
    }
  }, [stats]);

  return (
    <div className="confcrear">
      <div>
        <div className="msg">
          <h1>Su Transaccion fue exitosa</h1>
          <h2 className="msgh2">SUCCESS</h2>
        </div>
        <div className="msg1">
          <p>
            Su posición en la lista es el N°
            <strong> {lastReservation.idReserva}</strong>
          </p>
        </div>
        <div className="msg2">
          <strong>Your dashboard</strong>
          <p>
            Si quieres ver el tablero de la cola, comprar puestos, vender
            puestos, ver asignaciones mensuales, haz clic en el botón Dashboard.
          </p>
          <div className="dashboard">
            <button
              onClick={() => window.open("/estados", "_blank")}
              className="button"
            >
              Dashboard de Ventas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
  return (
    <div>
      <div>
        <h1>Su Transacción fue exitosa!</h1>
        <p>Su posición en la lista es el N° {lastReservation.idReserva}</p>
        <div>
          Your dashboard
          <p>
            Si quieres ver el tablero de la cola, comprar puestos, vender
            puestos, ver asignaciones mensuales, haz clic en el botón Dashboard.
          </p>
        </div>
        <div>
          <button onClick={() => window.open("/estados", "_blank")}>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
*/
