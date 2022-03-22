import "primereact/resources/themes/bootstrap4-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import FormularioRegistro from './components/FormularioRegistro/FormularioRegistro';
import Principal from "./components/Principal";
import ListaImpresores from "./components/ListaImpresores/ListaImpresores";
import DatosUsuario from "./components/DatosUsuario/DatosUsuario";
import PantallaInicial from "./components/PantallaInicial";
import NuevoPedido from "./components/NuevoPedido/NuevoPedido";
import MisPedidos from "./components/MisPedidos/MisPedidos";
import Ayuda from "./components/Ayuda/Ayuda";
import Login from "./components/Login/Login";


function App() {
  const [user, setUser]=useState(true);


  return (
    <BrowserRouter>
    <Principal>
      <Routes>{/*Switch*/}
          <Route exact path="/" element={<PantallaInicial />} />
          <Route exact path="ListaImpresores" element={<ListaImpresores/>} />
          <Route exact path="MisPedidos" element={<MisPedidos/>} />
          <Route exact path="Ayuda" element={<Ayuda/>} />
          <Route exact path="NuevoPedido" element={<NuevoPedido />} />
          <Route exact path="DatosUsuario" element={<DatosUsuario/>} />
          <Route exact path="FormularioRegistro" element={<FormularioRegistro/>} />
          <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </Principal>
    </BrowserRouter>
  );
}

export default App;
