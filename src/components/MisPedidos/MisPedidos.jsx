import Http from "../../Helpers/Http";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const MisPedidos=()=>{
    const [pedidos, setPedidos] = useState();
    const [currentUser, setCurrentUser]=useState("");

    const getPedidos= async()=>{
        const res = await Http.get(`/api/pedidos/getByUser=${Cookies.get('_id')}`);
        setPedidos(res);

        

    }

    const statusTemplate=(rowData)=> {
        switch (rowData.estado){
            case  'iniciado':
                return <Tag className="mr-2" severity="info" value={rowData.estado}></Tag>
            case 'imprimiendo':
                return <Tag className="mr-2" severity="primary" value={rowData.estado}></Tag>
            case 'finalizado':
                return <Tag className="mr-2" severity="success" value={rowData.estado}></Tag>
            default:
                return '-';
        }
    };

    const tamanyoTemplate = (rowData) => {
        return rowData.tamanyo + " cm³";
    }
    const precioTemplate = (rowData) => {
        return rowData.tamanyo + " €";
    }
    const fEntregaTemplate =(rowData)=>{
        return rowData.fecha_entrega.split(',',1);
    }
    const pedidoTemplate =(rowData)=>{
        return rowData._id.slice(0,6);
    }
    const ficheroTemplate = (rowData) => {
        //const res = await Http.get(`/api/usuarios/find=${rowData.id_impresor}`);
        // return `<a href="C:\\Proyectos\\Almarket-BackEnd\\uploads\\${rowData.fichero}">Descargar</a> `;
        let ruta=`C:\\Proyectos\\Almarket-BackEnd\\uploads\\${rowData.fichero}`;
        
        return <a href={ruta} download="myFile" target='_blank'>Download file</a>
    }


    useEffect(() => {
        getPedidos();
        setCurrentUser(Cookies.get('username'));
    }, []);

    useEffect(() => {
        //console.log(pedidos);
    }, [pedidos]);

    return(
        <div style={{ height:'50vw'}}>
        
        <h2>&nbsp;Todos los pedidos</h2>
        <DataTable value={pedidos} datakey='_id' responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                 size="small" emptyMessage="No se ha encontrado ningún pedido."
            >
                <Column field="_id" header="Pedido" sortable body={pedidoTemplate} />
                <Column field="usuario_impresor" header="Impresor" />
                <Column field="fecha_entrega" header="Fecha" sortable body={ fEntregaTemplate} />
                <Column field="direccion" header="Dirección"  />
                <Column field="estado" header="Estado" sortable body={statusTemplate} />
                <Column field="material" header="Material" />
                <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                <Column field="precioTotal" header="Precio" sortable body={precioTemplate}/>
                <Column field="descripcion" header="Descripción" />
                <Column field="fichero" header="Descargar" body={ficheroTemplate} />
            </DataTable>
        </div>
    )
}
export default MisPedidos;
