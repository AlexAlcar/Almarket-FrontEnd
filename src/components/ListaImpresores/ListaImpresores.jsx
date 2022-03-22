import React, { useState, useEffect, useRef } from "react";
import Http from "../../Helpers/Http";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { confirmDialog } from 'primereact/confirmdialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Chip } from 'primereact/chip';
import NuevoPedido from "../NuevoPedido/NuevoPedido";

const ListaImpresores = () => {
    const [impresores, setImpresores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [verNuevoPedido, setverNuevoPedido] = useState(false);
    const [impresorElegido, setImpresorElegido] = useState({
        apellido1: null,
        apellido2: null,
        email: null,
        impresoras: null,
        materiales: null,
        nombre: null,
        password: null,
        puntuacion: null,
        telefono: null,
        usuario: null,
        valoraciones: null,
        _id: null
    })

 
    const toast = useRef(null);

    const getListaImpresores = async () => {
        const dataSource = await Http.get("/api/impresores");
        console.log(dataSource);
        setImpresores(dataSource);
    }

    const ratingTemplate = (rowData) => {
        return <Rating value={parseInt(rowData.puntuacion)} readOnly cancel={false} />
    }

    /*const nuevoPedido = (rowData) => {
        setverNuevoPedido(true)
        return (<p>kk</p>)
        //toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        
    };*/


    const handleClickNuevoPedido = (rowData) => {

        return (
            <Button
                id="button"
                label='Nuevo pedido'
                className="p-button-raised p-button-text p-button-sm "
                icon="pi pi-plus-circle"
                onClick={() => {
                    confirmDialog({

                        message: '¿Seguro que quieres hacer un pedido a ' + rowData.usuario + '?',
                        icon: 'pi pi-info-circle',
                        accept: () => {
                            setLoading(true);
                            setverNuevoPedido(true);
                            setLoading(false);
                            setImpresorElegido({
                                apellido1: rowData.apellido1,
                                apellido2: rowData.apellido2,
                                email: rowData.email,
                                impresoras: rowData.impresoras,
                                materiales: rowData.materiales,
                                nombre: rowData.nombre,
                                password: rowData.password,
                                puntuacion: null,
                                telefono: null,
                                usuario: null,
                                valoraciones: null,
                                _id: null
                            })

                        }
                    });;
                }
                }
            />
        )
    }
    useEffect(() => {
        getListaImpresores();
    }, []);

    useEffect(()=>{
        
    },[loading]);

    return (
        <div className="card">
            
            <Sidebar visible={verNuevoPedido} position="top" style={{height:'50%'}} onHide={()=>{setverNuevoPedido(false)}}>
                <NuevoPedido/>
            </Sidebar>

            <Toast ref={toast} />
            <DataTable value={impresores} datakey='_id' header="Lista completa de impresores" responsiveLayout="stack" paginator className="p-datatable-customers" rows={10}
                globalFilterFields={['usuario', 'nombre', 'apellido1']} filterDisplay="row" size="small" emptyMessage="No se ha encontrado ningún impresor."
            >
                <Column field="usuario" header="Usuario" sortable filter filterPlaceholder="Buscar por nombre de usuario" className="p-inputtext-sm block mb-2" />
                <Column field="nombre" header="Nombre" sortable filter filterPlaceholder="Buscar por nombre" className="p-inputtext-sm block mb-2" />
                <Column field="apellido1" header="Apellido" sortable filter filterPlaceholder="Buscar por apellido" className="p-inputtext-sm block mb-2" />
                <Column field="impresoras" header="Impresoras" sortable />
                <Column field="puntuacion" header="Puntuación" body={ratingTemplate} sortable />
                <Column body={handleClickNuevoPedido} />
            </DataTable>
        </div>
    )
}
export default ListaImpresores;
