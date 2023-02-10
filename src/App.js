import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PagCrR from "./Paginas/pagCrR/PagCrR";
import PagCoR from "./Paginas/pagCoR/PagCoR";
import Visor from "./Paginas/Visor/Visor";
import EstadosRes from "./Paginas/EstadosRes/EstadosRes";
import ConfCrear from "./Paginas/confcrear/confCrear";
import ConfComprar from "./Paginas/confcomprar/confComprar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/crear" element={<PagCrR />}></Route>
        <Route exact path="/comprar" element={<PagCoR />}></Route>
        <Route exact path="/visor" element={<Visor />}></Route>
        <Route exact path="/estados" element={<EstadosRes />}></Route>
        <Route exact path="/confcrear" element={<ConfCrear />}></Route>
        <Route exact path="/confcomprar" element={<ConfComprar />}></Route>
        <Route path="*" element={<PagCrR />} />
      </Routes>
    </Router>
  );
}

export default App;
