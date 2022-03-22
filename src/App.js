import "primereact/resources/themes/bootstrap4-light-purple/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import './App.css';
import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
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
import PrivateRoute from "./Helpers/PrivateRoute";



function App() {
  const [authorized, setAuthorized]=useState(false);


  useEffect(() => {
    if(document.cookie)
    {
      //No solo hay que comprobar que haya cookie, también que los datos sean válidos (evitar falseo copiando cookie)
      setAuthorized(true);
    }
}, [authorized]);

  return (
    <BrowserRouter>
    {
      authorized?(
      <Principal>
        <Routes>{/*Switch*/}
            
            <Route exact path="/" element={<PantallaInicial />} />
            <Route exact path="ListaImpresores" element={<ListaImpresores />} />
            <Route exact path="MisPedidos" element={<MisPedidos />} />
            <Route exact path="Ayuda" element={<Ayuda />} />
            <Route exact path="NuevoPedido" element={<NuevoPedido />} />
            <Route exact path="DatosUsuario" element={<DatosUsuario />} />
            <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </Principal>
      ):<Login authorized={authorized} setAuthorized={setAuthorized}/>
}
    </BrowserRouter>
  );
}

export default App;
