import { useState, useEffect } from "react";
import Http from "../Helpers/Http";

const ListaImpresores=()=>{
    const [impresores, setImpresores]=useState([]);

    // const result = await Http.post(values,'/api/dishes/createDish');
    //const dataSource = await Http.get("/api/establishments/allEstablishments");
    const getListaImpresores= async()=>{
        const dataSource = await Http.get("/api/impresores");
        console.log(dataSource);
        setImpresores (dataSource);
        }
    


    useEffect(()=>{
        getListaImpresores();
        
    },[]);


    return(
        <p>Lista de impresores</p>
    )
}
export default ListaImpresores;
