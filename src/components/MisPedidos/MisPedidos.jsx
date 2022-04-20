import Http from "../../Helpers/Http";
import Cookies from 'js-cookie';
import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MisPedidos=()=>{
    const [pedidos, setPedidos] = useState();

    const getPedidos= async()=>{
        const res = await Http.get(`/api/pedidos/getByUser=${Cookies.get('_id')}`);
        setPedidos(res);
    }

    useEffect(() => {
        getPedidos();
    }, []);

    useEffect(() => {
        console.log(pedidos);
    }, [pedidos]);

    return(
        <>
        <h2>Lista de pedidos</h2>
        <DataTable value={pedidos} datakey='_id' header="Lista completa de impresores" responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                 size="small" emptyMessage="No se ha encontrado ningún impresor."
            >
                <Column field="_id" header="Pedido" sortable  />
                <Column field="id_impresor" header="ID Impresor" sortable />
                <Column field="id_usuario" header="ID Usuario"  sortable />
                <Column field="direccion" header="Dirección"  sortable />
                <Column field="estado" header="Estado" sortable />
                <Column field="material" header="Material" sortable />
                <Column field="tamanyo" header="Tamaño" sortable />
                <Column field="precioTotal" header="Precio" sortable />
            </DataTable>
        </>
    )
}
export default MisPedidos;
