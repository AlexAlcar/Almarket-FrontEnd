import Http from "../../Helpers/Http";
import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

const MisPedidos=()=>{
    const toastTL = useRef(null);
    const [pedidos, setPedidos] = useState();
    const [pedidosImpresor, setPedidosImpresor] = useState();
    const [currentUser, setCurrentUser]=useState("");
    const [nuevoPedido, setNuevoPedido] = useState({
        id_usuario: null,
        id_impresor: null,
        usuario_impresor: null,
        descripcion: null,
        cantidad: 1,
        tamanyo: null,
        material: null,
        direccion: null,
        fecha_entrega: null,
        estado: null,
        colores: null,
        comentarios: null,
        precioTotal: null,
        fichero: null,
        estado: null
    });

    const getPedidos= async()=>{
        const res = await Http.get(`/api/pedidos/getByUser=${Cookies.get('_id')}`);
        setPedidos(res);
    }

    const getPedidosImpresor= async()=>{
        const res = await Http.get(`/api/pedidos/getByPrinter=${Cookies.get('_id')}`);
        setPedidosImpresor(res);
    }

    const statusTemplate=(rowData)=> {
        switch (rowData.estado){
            case  'iniciado':
                return <Tag className="mr-2" severity="info" value={rowData.estado}></Tag>
            case 'imprimiendo':
                return <Tag className="mr-2" severity="primary" value={rowData.estado}></Tag>
            case 'enviado':
                return <Tag className="mr-2" severity="warning" value={rowData.estado}></Tag>
            case 'finalizado':
                return <Tag className="mr-2" severity="success" value={rowData.estado}></Tag>
            default:
                return '-';
        }
    };

    const preActualizarPedido=(rowData, nuevoEstado)=>{
        
        
        setNuevoPedido({...nuevoPedido,
            id: rowData._id,
            id_usuario: rowData.id_usuario,
            id_impresor: rowData.id_impresor,
            usuario_impresor: rowData.usuario_impresor,
            descripcion: rowData.descripcion,
            cantidad: rowData.cantidad,
            tamanyo: rowData.tamanyo,
            material: rowData.material,
            direccion: rowData.direccion,
            fecha_entrega: rowData.fecha_entrega,
            estado: nuevoEstado,
            colores: rowData.colores,
            comentarios: rowData.comentarios,
            precioTotal: rowData.precioTotal,
            fichero: rowData.fichero,
            estado: rowData.estado});
        console.log("nuevoPedido: ",nuevoPedido)
        
        //rowData.estado=nuevoEstado;
        actualizarPedido();
    }

    const actualizarPedido= async ()=>{
        console.log("nuevoPedido: ",nuevoPedido);
        let id=nuevoPedido.id;
        delete nuevoPedido.id;
        console.log("id: ",id);
        const res = Http.put(nuevoPedido, `/api/pedidos/${id}`);
        if(res)toastTL.current.show({ severity: 'success', summary: 'Datos actualizados', detail: 'El estado del pedido se ha actualizado correctamente', life: 3000 });
        else toastTL.current.show({ severity: 'error', summary: 'Datos NO actualizados', detail: 'Ha ocurrido un error', life: 3000 });
        
    }

    const statusPrinterTemplate=(rowData)=> {
        if(rowData.estado==='finalizado') return <Tag className="mr-2" severity="success" value="Pedido finalizado"></Tag>;
        else return <Dropdown value={rowData.estado} 
        options={["iniciado", "imprimiendo","enviado","finalizado"]}  
        onChange={(e)=>preActualizarPedido(rowData, e.value )} />
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
        if (rowData._id) return rowData._id.substr(rowData._id.length- 5);
    }
    const ficheroTemplate = (rowData) => {
        let ruta=`C:\\Proyectos\\Almarket-BackEnd\\uploads\\${rowData.fichero}`;        
        return <a href={ruta} download="myFile" target='_blank'>Download file</a>
    }


    useEffect(() => {
        getPedidos();
        setCurrentUser(Cookies.get('username'));
        if(Cookies.get('rol')==='impresor')getPedidosImpresor();
    }, []);

    useEffect(() => {
    }, [pedidos, pedidosImpresor]);

   

    return(
        <div style={{ height:'50vw'}}>
         <Toast ref={toastTL} position="top-left" />
        <h2>&nbsp;Todos los pedidos</h2>
        <DataTable value={pedidos} header="Pedidos realizados" datakey='_id' responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                 size="small" emptyMessage="No se ha encontrado ningún pedido."
            >
                <Column field="_id" header="Pedido" sortable body={pedidoTemplate} />
                <Column field="usuario_impresor" header="Impresor" />
                <Column field="fecha_entrega" header="Fecha" sortable body={ fEntregaTemplate} />
                <Column field="direccion" header="Dirección"  />
                <Column field="estado" header="Estado" sortable body={statusTemplate} />
                <Column field="material" header="Material" />
                <Column field="color" header="Color" />
                <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                <Column field="precioTotal" header="Precio" sortable body={precioTemplate}/>
                <Column field="descripcion" header="Descripción" />
                <Column field="fichero" header="Descargar" body={ficheroTemplate} />
            </DataTable>

            {Cookies.get('rol')==="impresor"?(
                <>
                 <Divider />
                <DataTable value={pedidosImpresor} header="Pedidos recibidos/pendientes" datakey='_id' responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                 size="small" emptyMessage="No se ha encontrado ningún pedido."
            >
                <Column field="_id" header="Pedido" sortable body={pedidoTemplate} />
                <Column field="usuario_impresor" header="Impresor" />
                <Column field="fecha_entrega" header="Fecha" sortable body={ fEntregaTemplate} />
                <Column field="direccion" header="Dirección"  />
                <Column field="estado" header="Estado" sortable body={statusPrinterTemplate} />
                <Column field="material" header="Material" />
                <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                <Column field="precioTotal" header="Precio" sortable body={precioTemplate}/>
                <Column field="descripcion" header="Descripción" />
                <Column field="fichero" header="Descargar" body={ficheroTemplate} />
            </DataTable>
                
                </>
            ):""}
    <div style={{fontSize:'11px', marginTop:'5%'}}>
    <h4>Leyenda:</h4>
    <p><Tag className="mr-2" severity="info" value='iniciado:' style={{fontSize:'11px'}}></Tag> Se ha iniciado el pedido y ha llegado al impresor, pero todavía no se está imprimiendo</p>
    <p><Tag className="mr-2" severity="primary" value='imprimiendo:' style={{fontSize:'11px'}}></Tag> El pedido está en el proceso de impresión o post-procesado</p>
    <p><Tag className="mr-2" severity="warning" value='enviado:' style={{fontSize:'11px'}}></Tag> El pedido está en proceso de envío a la dirección de destino</p>
    <p><Tag className="mr-2" severity="success" value='finalizado:' style={{fontSize:'11px'}}></Tag> El pedido ha sido recibido por el cliente y ha finalizado</p>
    </div>   </div>
    )
}
export default MisPedidos;
