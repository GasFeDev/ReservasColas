import "./VisorColas.css";
import ListaColas from "../../assets/ListaColas.png";
import visor from "../../assets/visor.png";

export default function VisorColas() {
  return (
    <div className="colas-form-container">
      <div>
        <h1>Listas Enlazadas</h1>
        <h3>
          La confianza de tener una lista publica, pero a la vez inalterable,
          hara que la espera por mercancia no se haga con desconfianza...
        </h3>
        <h2>Mercancia asignada en esta ronda 10</h2>
        <img src={ListaColas} alt="Lista de Colas" className="lista-colas" />
      </div>
      <div className="desc">Desea Participar? adquiera una plaza ahora</div>
      <div className="porcentaje">
        <img src={visor} alt="Total de clientes" className="clientes" />
      </div>
    </div>
  );
}
