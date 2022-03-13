import "primereact/resources/themes/lara-light-teal/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormularioRegistro from './components/FormularioRegistro';
import Principal from "./components/Principal";
import ListaImpresores from "./components/ListaImpresores";
import DatosUsuario from "./components/DatosUsuario";
import PantallaInicial from "./components/PantallaInicial";
import NuevoPedido from "./components/NuevoPedido";
import MisPedidos from "./components/MisPedidos";
import Ayuda from "./components/Ayuda";


function App() {
  return (
    <BrowserRouter>
    <Principal>
      <Routes>
          <Route path="/" element={<PantallaInicial />} />
          <Route path="ListaImpresores" element={<ListaImpresores/>} />
          <Route path="MisPedidos" element={<MisPedidos/>} />
          <Route path="Ayuda" element={<Ayuda/>} />
          <Route path="NuevoPedido" element={<NuevoPedido/>} />
          <Route path="DatosUsuario" element={<DatosUsuario/>} />
          <Route path="FormularioRegistro" element={<FormularioRegistro/>} />
      </Routes>
    </Principal>
    </BrowserRouter>
  );
}

export default App;
