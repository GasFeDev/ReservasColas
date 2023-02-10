import { useState } from "react";
import Wallet from "../../components/wallet/Wallet";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import "./EstadosRes.css";
import Reservas from "../../components/estadosReservas/Reservas";
import { useNavigate } from "react-router-dom";

export default function EstadosRes() {  
  const { library } = useWeb3React();
  const colasContract = process.env.REACT_APP_COLAS_CONTRACT;
  const colasABI = require("../../ABIs/Colas.json");
  const [stats, setStats] = useState({});  
  const navigate = useNavigate();

  let eventEmitter;

  const comprarReserva = async (
    _idReserva,
    _precioVenta,
    _nuevoPrecioVenta
  ) => {
    try {
      const colas = new ethers.Contract(
        colasContract,
        colasABI.abi,
        library.getSigner()
      );

      const tx = await colas.comprarReserva(
        _idReserva,
        ethers.utils.parseEther(_nuevoPrecioVenta.toString()),
        { value: ethers.utils.parseEther(_precioVenta.toString()) }
      );

      eventEmitter = colas.on("ReservaComprada", (idReserva, nombre, apellido, dni, precioVenta, dueno) => {
        setStats({ 
          idReserva: parseInt(idReserva.toString(), 16), 
          nombre, 
          apellido, 
          dni: parseInt(dni.toString(), 16),
          precioVenta: ethers.utils.formatEther(precioVenta), 
          dueno });   
      });
  
      await tx.wait(); 
      colas.off("ReservaComprada", eventEmitter);     
      navigate("/confcomprar");
      
    } catch (error) {
      window.alert(error.data.message);
    }
  };

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
        <h1>Dashboard</h1>
        <Wallet />
      </div>
      <div className="reserva">
        <Reservas
          stats={stats}
          getStats={reservas}
          comprarReserva={comprarReserva}
        />
      </div>
    </div>
  );
}
