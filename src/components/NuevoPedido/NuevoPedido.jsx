import React, { useState, useEffect, useRef } from "react";
import Http from "../../Helpers/Http";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Tooltip } from 'primereact/tooltip';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { ColorPicker } from 'primereact/colorpicker';
import { Card } from "primereact/card";

const NuevoPedido = ({ verNuevoPedido, impresorElegido, setverNuevoPedido }) => {
    const [color, setColor] = useState('1976D2');
    const [nuevoPedido, setNuevoPedido] = useState({
        id_usuario: null,
        id_impresor: null,
        descripcion: null,
        cantidad: null,
        tamanyo: null,
        material: null,
        fecha_entrega: null,
        estado: null,
        color: null,
        fichero: null
    });
    const [visibilidad, setVisibilidad] = useState(verNuevoPedido);
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

    const fileUpload=()=>{

    }

    const crearPedido = () => {
        //impresorElegido._id



    }

    useEffect(() => {

    }, [color]);
    return (
        <Card style={{ width: '60rem', paddingRight: '1%', paddingLeft: '1%' }} className="p-sidebar-lg" onHide={() => setVisibilidad(false)}>

            <div className="card">
                <div className="p-fluid formgrid grid">
                    <div style={{ float: 'left', marginLeft: '20%' }}>
                        <label htmlFor="date">Cantidad:</label><br />
                        <InputNumber inputId="minmax-buttons" mode="decimal" showButtons min={1} max={999} style={{ width: '200px' }} />
                        <br /><br />
                        <label>Color: #{color}</label><br />
                        <ColorPicker value={color} onChange={(e) => { setNuevoPedido({ ...nuevoPedido, color: e.value }); setColor(e.value) }} ></ColorPicker>
                        <br /><br />
                    </div>
                    <div style={{ float: 'right', marginRight: '20%' }}>
                        <label htmlFor="date">Material:</label>
                        <Dropdown optionLabel="name" options={[
                            { name: 'PLA', code: 'PLA' },
                            { name: 'PETG', code: 'PET' },
                            { name: 'Filaflex', code: 'FFL' },
                            { name: 'ABS', code: 'ABS' },
                            { name: 'Otros', code: 'OTROS' },
                        ]} style={{ width: '200px' }} /><br />
                        <label htmlFor="date">Fecha Máxima:</label>
                        <Calendar style={{ width: '200px' }} id="spanish" onChange={(e) => setNuevoPedido({ ...nuevoPedido, fecha_entrega: e.value })} locale="es" dateFormat="dd/mm/yy" />
                        <br />
                    </div>
                    <div style={{ float: 'bottom' }}>
                        <InputTextarea id="color" style={{ height: '150px' }} placeholder='Descripción / Datos adicionales'></InputTextarea>

                        <div>
                            <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom" />
                            <Tooltip target=".custom-upload-btn" content="Subir" position="bottom" />
                            <Tooltip target=".custom-cancel-btn" content="Limpiar" position="bottom" />

                            <div>
                                <p>Subir fichero .stl: </p>
                                <FileUpload
                                    name="demo[]"
                                    url="https://primefaces.org/primereact/showcase/upload.php"
                                    onUpload={fileUpload}
                                    accept="*/*"
                                    maxFileSize={1000000}
                                    emptyTemplate={
                                        <p className="m-0">Arrastra y suelta ficheros aquí para subir.</p>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <div style={{textAlign:'center'}}>
                <Button label="Atrás" icon="pi pi-times" className="p-button-text" onClick={() => setverNuevoPedido(false)} />
                <Button label="Crear" icon="pi pi-check" autoFocus onClick={() => crearPedido()} />
            </div>
        </Card>
    )
}
export default NuevoPedido;
