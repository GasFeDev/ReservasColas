import { useState } from "react";
import Wallet from "../../components/wallet/Wallet";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import "./confCrear.css";
import Reservas from "../../components/confcrear/ultConf";

export default function ConfCrear() {
  const { library } = useWeb3React();
  const colasContract = process.env.REACT_APP_COLAS_CONTRACT;
  const colasABI = require("../../ABIs/Colas.json");
  const [stats, setStats] = useState({});

  const reservas = async () => {
    const colas = new ethers.Contract(
      colasContract,
      colasABI.abi,
      library.getSigner()
    );

    const maxReservas = 1000;

    const todasLasReservas = [];

    for (let i = 0; i < maxReservas; i++) {
      try {
        const reserva = await colas.reservas(i);
        todasLasReservas.push({
          idReserva: reserva.idReserva.toString(),
          nombre: reserva.nombre.toString(),
          apellido: reserva.apellido.toString(),
          dni: reserva.dni.toString(),
          precioVenta: ethers.utils.formatEther(reserva.precioVenta),
          dueno: reserva.dueno.toString(),
        });
      } catch (error) {
        break;
      }
    }
    setStats(todasLasReservas);
  };
  return (
    <div className="header">
      <div className="wallet">
        <h1>Confirmación</h1>
        <Wallet />
      </div>
      <div className="reservacrear">
        <Reservas stats={stats} getStats={reservas} />
      </div>
    </div>
  );
}
