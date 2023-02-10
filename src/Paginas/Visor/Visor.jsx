import VisorColas from "../../components/visorColas/VisorColas";
import Wallet from "../../components/wallet/Wallet";

export default function Visor() {
  return (
    <div className="header">
      <div className="wallet">
        <h1>Visor de Colas de espera</h1>
        <Wallet />
      </div>
      <div className="reserva">
        <VisorColas />
      </div>
    </div>
  );
}
