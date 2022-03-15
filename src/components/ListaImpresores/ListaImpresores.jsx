import React, { useState, useEffect, useRef } from "react";
import Http from "../../Helpers/Http";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Sidebar } from 'primereact/sidebar';
import { Dropdown } from 'primereact/dropdown';
import { confirmPopup } from 'primereact/confirmpopup';

const ListaImpresores = () => {
    const [impresores, setImpresores] = useState([]);
    const [verNuevoPedido, setverNuevoPedido] = useState(false);
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
                    confirmPopup({
                        target: this,
                        message: '¿Seguro que quieres hacer un pedido a ' + rowData.usuario+'?',
                        icon: 'pi pi-info-circle',
                        accept: () =>setverNuevoPedido(true),
                    });;
                }
                }
            />
        )
    }
    useEffect(() => {
        getListaImpresores();
    }, []);

    return (
        <div className="card">
            <Sidebar visible={verNuevoPedido} fullScreen onHide={() => setverNuevoPedido(false)}>
            <h5>id impresor: </h5>
            <Dropdown optionLabel="name" options={[
                { name: 'Australia', code: 'AU' },
                { name: 'Brazil', code: 'BR' },
                { name: 'China', code: 'CN' },
                { name: 'Egypt', code: 'EG' },
                { name: 'France', code: 'FR' },
                { name: 'Germany', code: 'DE' },
                { name: 'India', code: 'IN' },
                { name: 'Japan', code: 'JP' },
                { name: 'Spain', code: 'ES' },
                { name: 'United States', code: 'US' }
            ]} 
            placeholder="Elige un..." />
            <h5>id impresor: </h5>
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
