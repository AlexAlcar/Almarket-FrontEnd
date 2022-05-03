import Http from "../../Helpers/Http";
import Cookies from 'js-cookie';
import React, { useState, useEffect, useRef } from "react";
import { Rating } from 'primereact/rating';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';

const MisPedidos = () => {
    const toastTL = useRef(null);
    const [pedidos, setPedidos] = useState();
    const [pedidosImpresor, setPedidosImpresor] = useState();
    const [currentUser, setCurrentUser] = useState("");

    const getPedidos = async () => {
        const res = await Http.get(`/api/pedidos/getByUser=${Cookies.get('_id')}`);
        setPedidos(res);
    }

    const getPedidosImpresor = async () => {
        const res = await Http.get(`/api/pedidos/getByPrinter=${Cookies.get('_id')}`);
        console.log(res);
        setPedidosImpresor(res);
    }

    const statusTemplate = (rowData) => {
        switch (rowData.estado) {
            case 'iniciado':
                return <Tag className="mr-2" severity="info" value={rowData.estado}></Tag>
            case 'imprimiendo':
                return <Tag className="mr-2" severity="primary" value={rowData.estado}></Tag>
            case 'enviado':
                return <Tag className="mr-2" severity="warning" value={rowData.estado}></Tag>
            case 'finalizado':
                return <Tag className="mr-2" severity="success" value={rowData.estado}></Tag>
            case 'cerrado':
                return <Tag className="mr-2" severity="success" value="finalizado"></Tag>
            default:
                return '-';
        }
    };

    const preActualizarPedido = (rowData, nuevoEstado) => {
        let rowDataUpdate = rowData;
        let id = rowData._id;
        rowData.estado = nuevoEstado;
        actualizarPedido(rowDataUpdate);
    }

    const actualizarPedido = async (rowDataUpdate) => {
        console.log("ID que vas a modificar ", rowDataUpdate._id);
        let id = rowDataUpdate._id;
        console.log("RowDataUpdate ", rowDataUpdate);
        delete rowDataUpdate._id;
        const res = await Http.put(rowDataUpdate, `/api/pedidos/${id}`);
        if (res) toastTL.current.show({ severity: 'success', summary: 'Datos actualizados', detail: 'El estado del pedido se ha actualizado correctamente', life: 3000 });
        else toastTL.current.show({ severity: 'error', summary: 'Datos NO actualizados', detail: 'Ha ocurrido un error', life: 3000 });
        getPedidosImpresor();
    }

    const statusPrinterTemplate = (rowData) => {
        if (rowData.estado === 'finalizado' || rowData.estado === 'cerrado') return <Tag className="mr-2" severity="success" value="Pedido finalizado"></Tag>;
        else return <Dropdown value={rowData.estado}
            options={["iniciado", "imprimiendo", "enviado", "finalizado"]}
            onChange={(e) => preActualizarPedido(rowData, e.value)} />
    };
    const tamanyoTemplate = (rowData) => {
        return rowData.tamanyo + " cm³";
    }
    const precioTemplate = (rowData) => {
        return rowData.tamanyo + " €";
    }
    const fEntregaTemplate = (rowData) => {
        return rowData.fecha_entrega.split(',', 1);
    }
    const pedidoTemplate = (rowData) => {
        if (rowData._id) return rowData._id.substr(rowData._id.length - 5);
    }
    const ficheroTemplate = (rowData) => {
        let ruta = `C:\\Proyectos\\Almarket-BackEnd\\uploads\\${rowData.fichero}`;
        if (rowData.estado === "finalizado")
            return <a href={ruta} download="myFile" target='_blank'>Download file</a>
    }

    const ratingTemplate = (rowData) => {
        //let printerInfo=getPrinterInfo(rowData.id_impresor);
        //console.log(res);
        if (rowData.estado === "finalizado")
            return <>
                <Rating value={rowData.valoraciones} cancel={false} onChange={(e) => valorarImpresor(rowData.usuario_impresor, rowData._id, e.value)}
                />
            </>
        else if (rowData.estado === "cerrado")
            return <i className="pi pi-check" />;
        }
    const valorarImpresor = async (impresor, idPedido, punt) => {
        let data = { puntuacion: punt, pedido: idPedido };
        let data2 = { estado: "cerrado" };
        const res = await Http.put(data, `/api/usuarios/rateUser=${impresor}`);
        console.log(res);
        toastTL.current.show({ severity: 'success', summary: 'Valoración enviada', detail: 'Has valorado el pedido', life: 3000 });
        getPedidos();
        /////////////
    }


    useEffect(() => {
        getPedidos();
        setCurrentUser(Cookies.get('username'));
        if (Cookies.get('rol') === 'impresor') getPedidosImpresor();
    }, []);

    useEffect(() => {
    }, [pedidos, pedidosImpresor]);



    return (
        <div style={{ height: '50vw' }}>
            <Toast ref={toastTL} position="top-left" />
            <h2>&nbsp;Todos los pedidos</h2>
            <DataTable value={pedidos} header="Pedidos realizados" datakey='_id' responsiveLayout="stack" paginator className="p-datatable-customers" rows={5}
                size="small" emptyMessage="No se ha encontrado ningún pedido."
            >
                <Column field="_id" header="Pedido" sortable body={pedidoTemplate} />
                <Column field="usuario_impresor" header="Impresor" />
                <Column field="fecha_entrega" header="Fecha" sortable body={fEntregaTemplate} />
                <Column field="direccion" header="Dirección" />
                <Column field="estado" header="Estado" sortable body={statusTemplate} />
                <Column field="material" header="Material" />
                <Column field="color" header="Color" />
                <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                <Column field="precioTotal" header="Precio" sortable body={precioTemplate} />
                <Column id="colValoracion" field="valoracion" header="Valorar" body={ratingTemplate} />
                <Column field="descripcion" header="Descripción" />
            </DataTable>

            {Cookies.get('rol') === "impresor" ? (
                <>
                    <Divider />
                    <DataTable value={pedidosImpresor} header="Pedidos recibidos/pendientes" datakey='_id' responsiveLayout="stack" paginator className="p-datatable-customers" rows={5}
                        size="small" emptyMessage="No se ha encontrado ningún pedido."
                    >
                        <Column field="_id" header="Pedido" sortable body={pedidoTemplate} />
                        <Column field="usuario" header="usuario" />
                        <Column field="fecha_entrega" header="Fecha" sortable body={fEntregaTemplate} />
                        <Column field="direccion" header="Dirección" />
                        <Column field="estado" header="Estado" sortable body={statusPrinterTemplate} />
                        <Column field="material" header="Material" />
                        <Column field="tamanyo" header="Tamaño" sortable body={tamanyoTemplate} />
                        <Column field="precioTotal" header="Precio" sortable body={precioTemplate} />
                        <Column field="descripcion" header="Descripción" />
                        <Column field="fichero" header="Descargar" body={ficheroTemplate} />
                    </DataTable>
                </>
            ) : ""}
            <div style={{ fontSize: '11px', marginTop: '5%' }}>
                <h4>Leyenda:</h4>
                <p><Tag className="mr-2" severity="info" value='iniciado:' style={{ fontSize: '11px' }}></Tag> Se ha iniciado el pedido y ha llegado al impresor, pero todavía no se está imprimiendo</p>
                <p><Tag className="mr-2" severity="primary" value='imprimiendo:' style={{ fontSize: '11px' }}></Tag> El pedido está en el proceso de impresión o post-procesado</p>
                <p><Tag className="mr-2" severity="warning" value='enviado:' style={{ fontSize: '11px' }}></Tag> El pedido está en proceso de envío a la dirección de destino</p>
                <p><Tag className="mr-2" severity="success" value='finalizado:' style={{ fontSize: '11px' }}></Tag> El pedido ha sido recibido por el cliente y ha finalizado</p>
            </div>   </div>
    )
}
export default MisPedidos;
