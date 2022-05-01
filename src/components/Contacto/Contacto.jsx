import { Button } from 'primereact/button';
import { Editor } from 'primereact/editor';
import { Toast } from 'primereact/toast';

import React, { useState, useRef } from 'react';

const Contacto =()=>{
    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({severity:'success', summary: 'Formulario Enviado', detail:'Gracias por contactar con nosotros', life: 3000});
    }

    return (
        <div style={{width:'50%', marginLeft:'1%'}}>
            <Toast ref={toast}  position="top-left" />
             <h3 style={{textAlign:'center'}}>Formulario de contacto</h3>
                <Editor style={{ height: '320px' }}   /><br/>
                <Button label='Enviar consulta' style={{marginLeft:'10px'}} onClick={()=>showSuccess()}></Button>
        </div>
    )
}
export default Contacto;