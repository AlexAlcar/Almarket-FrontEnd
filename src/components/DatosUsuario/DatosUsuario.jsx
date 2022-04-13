import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Http from "../../Helpers/Http";
import { Chip } from 'primereact/chip';
import { Card } from 'primereact/card';

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
        <Card>
        <p><Chip label={`Nombre de usuario: ${userData.usuario}`}></Chip></p>
        <p><Chip label={`Nombre: ${userData.nombre}`}></Chip></p>
        <p><Chip label={`Apellidos: ${userData.apellido1} ${userData.apellido2}`}></Chip></p>
        <p><Chip label={`Email: ${userData.email}`}></Chip></p>
        <p><Chip label={`Teléfono: ${userData.telefono}`}></Chip></p>
        <p><Chip label={`Dirección: ${userData.direccion}`}></Chip></p>
        <p><Chip label={`Perfil: ${userData.perfil}`}></Chip></p>
        </Card>
    )
}
export default DatosUsuario;
