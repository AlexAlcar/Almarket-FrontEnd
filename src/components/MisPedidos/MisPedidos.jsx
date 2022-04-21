import Http from "../../Helpers/Http";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';

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
    /*const impresorTemplate = async (rowData) => {
        const res = await Http.get(`/api/usuarios/find=${rowData.id_impresor}`);
        console.log(res);
        return res._id;
    }*/


    useEffect(() => {
        getPedidos();
        setCurrentUser(Cookies.get('username'));
    }, []);

    useEffect(() => {
        //console.log(pedidos);
    }, [pedidos]);

    return(
        <>
        
        <h2>Lista de pedidos</h2>
        <DataTable value={pedidos} datakey='_id' header="Tus pedidos" responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                 size="small" emptyMessage="No se ha encontrado ningún impresor."
            >
                <Column field="_id" header="Pedido" sortable  />
                <Column field="usuario_impresor" header="Impresor" sortable />
                <Column field="fecha_entrega" header="Fecha de entrega" sortable body={ fEntregaTemplate} />
                <Column field="direccion" header="Dirección" sortable />
                <Column field="estado" header="Estado" sortable body={statusTemplate} />
                <Column field="material" header="Material" sortable />
                <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                <Column field="precioTotal" header="Precio" sortable body={precioTemplate}/>
                <Column field="fichero" header="STL" sortable />
            </DataTable>
        </>
    )
}
export default MisPedidos;
