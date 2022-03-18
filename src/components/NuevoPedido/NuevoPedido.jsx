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
import { Card } from "primereact/card";

const NuevoPedido=({verNuevoPedido})=>{
    const [nuevoPedido, setNuevoPedido] = useState({
        id_usuario: null,
        id_impresor: null,
        descripcion: null,
        cantidad: null,
        material: null,
        fecha_entrega: null,
        estado: null,
        color: null,
    });
    const [visibilidad,setVisibilidad] = useState(verNuevoPedido);
    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });
    return(
        <Card className="p-sidebar-lg" position="top" style={{ height: '50%' }} onHide={() => setVisibilidad(false)}>
                <div className="card" >
                    <div className="p-fluid formgrid grid">
                        <h2>Crear un nuevo pedido para</h2>
                        <div className="field col-12 md:col-4">
                            <label>Color</label><br />
                            <InputText style={{width:'50%'}}id="color" ></InputText>
                            <br /><br />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="date">Cantidad</label><br />
                            <InputNumber style={{width:'50%'}} inputId="minmax-buttons" mode="decimal" showButtons min={1} max={999} />
                            <br /><br />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="date">Material</label>
                            <Dropdown style={{width:'50%'}} optionLabel="name" options={[
                                { name: 'PLA', code: 'PLA' },
                                { name: 'PETG', code: 'PET' },
                                { name: 'Filaflex', code: 'FFL' },
                                { name: 'ABS', code: 'ABS' },
                            ]} /><br />
                        </div>
                        <div className="field col-12 md:col-4">
                            <label htmlFor="date">Material</label>
                            <Calendar style={{width:'50%'}} id="spanish" onChange={(e) => setNuevoPedido({ ...nuevoPedido, fecha_entrega: e.value })} locale="es" dateFormat="dd/mm/yy" />
                        </div>

                    </div>
                </div>
            </Card>
    )
}
export default NuevoPedido;
