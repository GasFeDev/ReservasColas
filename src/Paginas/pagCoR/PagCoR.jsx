import Wallet from "../../components/wallet/Wallet";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import "./PagCoR.css";
import ComprarReserva from "../../components/comprarReserva/ComprarReserva";

export default function PagCoR() {
  const { library } = useWeb3React();
  const colasContract = process.env.REACT_APP_COLAS_CONTRACT;
  const colasABI = require("../../ABIs/Colas.json");

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

      await tx.wait();
    } catch (error) {
      window.alert(error.data.message);
    }
  };

  return (
    <div className="header">
      <div className="wallet">
        <h1>Comprar Reserva</h1>
        <Wallet />
      </div>
      <div className="reserva">
        <ComprarReserva comprarReserva={comprarReserva} />
      </div>
    </div>
  );
}
