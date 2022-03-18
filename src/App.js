import "primereact/resources/themes/bootstrap4-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormularioRegistro from './components/FormularioRegistro/FormularioRegistro';
import Principal from "./components/Principal";
import ListaImpresores from "./components/ListaImpresores/ListaImpresores";
import DatosUsuario from "./components/DatosUsuario/DatosUsuario";
import PantallaInicial from "./components/PantallaInicial";
import NuevoPedido from "./components/NuevoPedido/NuevoPedido";
import MisPedidos from "./components/MisPedidos/MisPedidos";
import Ayuda from "./components/Ayuda/Ayuda";


function App() {
  return (
    <BrowserRouter>
    <Principal>
      <Routes>
          <Route path="/" element={<PantallaInicial />} />
          <Route path="ListaImpresores" element={<ListaImpresores/>} />
          <Route path="MisPedidos" element={<MisPedidos/>} />
          <Route path="Ayuda" element={<Ayuda/>} />
          <Route path="NuevoPedido" element={<NuevoPedido />} />
          <Route path="DatosUsuario" element={<DatosUsuario/>} />
          <Route path="FormularioRegistro" element={<FormularioRegistro/>} />
      </Routes>
    </Principal>
    </BrowserRouter>
  );
}

export default App;
