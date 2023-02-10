import Wallet from "../../components/wallet/Wallet";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import "./PagCrR.css";
import CrearReserva from "../../components/crearReserva/CrearReserva";
import { useNavigate } from "react-router-dom";

export default function PagCrR() {
  const navigate = useNavigate();
  const { library } = useWeb3React();
  const colasContract = process.env.REACT_APP_COLAS_CONTRACT;
  const colasABI = require("../../ABIs/Colas.json");

  const crearReserva = async (_nombre, _apellido, _dni) => {
    try {
      const colas = new ethers.Contract(
        colasContract,
        colasABI.abi,
        library.getSigner()
      );

      const tx = await colas.crearReserva(_nombre, _apellido, _dni, {
        value: ethers.utils.parseEther("0.0001"),
      });

      await tx.wait();
      navigate("/confcrear");
    } catch (error) {
      window.alert(error.data.message);
    }
  };

  return (
    <div className="header">
      <div className="wallet">
        <Wallet />
      </div>
      <div className="reserva">
        <CrearReserva crearReserva={crearReserva} />
      </div>
    </div>
  );
}
