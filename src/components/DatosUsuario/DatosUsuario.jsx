import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Http from "../../Helpers/Http";
import { Chip } from 'primereact/chip';
import { Divider } from 'primereact/divider';
import { Inplace, InplaceDisplay, InplaceContent  } from 'primereact/inplace';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

const DatosUsuario=()=>{
const [userData, setUserData]=useState({
    nombre: '',
    apellido1: '',
    apellido2: '',
    telefono: '',
    email: '',
    direccion: '',
    perfil: '',
    usuario: '',
    password: '',
    precio: null,
    tamanyo: null,
    impresoras: null,
});
    
const getDatosUsuario= async (id)=>{
 const res= await Http.get(`/api/usuarios/find=${id}`);
 setUserData({
     ...userData, 
     nombre: res.nombre,
     apellido1:res.apellido1,
     apellido2:res.apellido2,
     telefono:res.telefono,
     email:res.email,
     direccion:res.direccion,
     perfil:res.perfil,
     usuario:res.usuario,
     password:res.password,
     precio:res.precio,
     tamanyo:res.tamanyo,
     impresoras:res.impresoras
    });
}
    useEffect(() => {
        let id= Cookies.get('_id');
        getDatosUsuario(id);

    }, []);

    return(
        <>
        <Divider align="left" type="dashed">
                    <b>Datos de usuario</b>
                </Divider>
        <div style={{height:'50vw', margin:'1%'}}>
        {/*<p><Chip label={`Nombre de usuario: ${userData.usuario}`}></Chip></p>
        <p><Chip label={`Nombre: ${userData.nombre}`}></Chip></p>
        <p><Chip label={`Apellidos: ${userData.apellido1} ${userData.apellido2}`}></Chip></p>
        <p><Chip label={`Email: ${userData.email}`}></Chip></p>
        <p><Chip label={`Teléfono: ${userData.telefono}`}></Chip></p>
        <p><Chip label={`Dirección: ${userData.direccion}`}></Chip></p>
    <p><Chip label={`Perfil: ${userData.perfil}`}></Chip></p>*/}


        <h5>Nombre: </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.nombre || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.nombre}
              onChange={(e) => setUserData({...userData, nombre:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>
        <h5>Primer Apellido: </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.apellido1 || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.apellido1}
              onChange={(e) => setUserData({...userData, apellido1:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>

        <h5>Segundo Apellido: </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.apellido2 || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.apellido2}
              onChange={(e) => setUserData({...userData, apellido2:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>

        <h5>Correo electrónico </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.email || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.email}
              onChange={(e) => setUserData({...userData, email:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>

        <h5>Teléfono </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.telefono || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.telefono}
              onChange={(e) => setUserData({...userData, telefono:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>

        <h5>Dirección </h5>
        <Inplace closable>
          <InplaceDisplay>{userData.direccion || "Haz clic para editar"}</InplaceDisplay>
          <InplaceContent>
            <InputText
              value={userData.direccion}
              onChange={(e) => setUserData({...userData, direccion:e.target.value})}
              autoFocus
            />
          </InplaceContent>
        </Inplace>

        <br/>
        <Button label="Guardar"   />&nbsp;&nbsp;
        <Button label="Descartar" className="p-button-danger" />
        </div>
        </>
    )
}
export default DatosUsuario;
