import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import Wallet from "../../components/wallet/Wallet";
import "./confComprar.css";

function acortarDireccion(direccion) {
  return (
    direccion.substring(0, 6) +
    "..." +
    direccion.substring(direccion.length - 4)
  );
}

const MostrarDatosDeCompra = () => {
  const { library } = useWeb3React();
  const colasContract = process.env.REACT_APP_COLAS_CONTRACT;
  const colasABI = require("../../ABIs/Colas.json");

  const [datosCompra, setDatosCompra] = useState({});

  useEffect(() => {
    const colas = new ethers.Contract(
      colasContract,
      colasABI.abi,
      library.getSigner()
    );

    (async () => {
      const subscription = await colas.on(
        "ReservaComprada",
        (idReserva, nombre, apellido, dni, precioVenta, dueno) => {
          setDatosCompra({
            idReserva: parseInt(idReserva.toString(), 16),
            nombre,
            apellido,
            dni: parseInt(dni.toString(), 16),
            precioVenta: ethers.utils.formatEther(precioVenta),
            dueno,
          });
        }
      );

      return () => {
        if (subscription) {
          subscription.remove();
        }
      };
    })();
  }, [colasContract, colasABI, library]);

  return (
    <div className="header">
      <div className="wallet">
        <Wallet />
      </div>
      <div className="confcomp">
        <div>
          <div className="aviso">
            <h1>Su Transaccion fue exitosa</h1>
            <h2 className="avisoh2">SUCCESS</h2>
          </div>
          <div className="aviso1">
            <p>
              Su nueva posición en la lista ahora es el N°
              <strong> {datosCompra.idReserva}</strong>
            </p>
            <div>
              <h2 className="datos">Datos de su Reserva</h2>
              <p>Su Nombre: {datosCompra.nombre}</p>
              <p>Su Apellido: {datosCompra.apellido}</p>
              <p>Su DNI: {datosCompra.dni}</p>
              <p>
                Ha puesto un precio de Venta de: {datosCompra.precioVenta} ETH
              </p>
              <p>
                Su address es:{" "}
                {datosCompra.dueno ? acortarDireccion(datosCompra.dueno) : null}
              </p>{" "}
            </div>
          </div>
          <div className="dash">
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
};

export default MostrarDatosDeCompra;
