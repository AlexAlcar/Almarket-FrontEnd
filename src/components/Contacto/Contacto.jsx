import { Button } from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from "primereact/toast";
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState, useRef } from "react";
import emailjs from 'emailjs-com';
import { Card } from "primereact/card";

const Contacto = () => {
  const toast = useRef(null);
  const [toSubmit, setToSubmit] = useState("");
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      summary: "Formulario Enviado",
      detail: "Gracias por contactar con nosotros",
      life: 3000,
    });
    setToSubmit("");
  };
  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_1b5kh6j', 'template_rrvjtcj', e.target, 'cJ1ck9bRVuMecaVSC')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      showSuccess();
      document.getElementById('form').reset()
  }

  useEffect(() => {}, [toSubmit]);
  return (
    <Card>
    <div style={{display: "flex", justifyContent: 'center' }}>
      
      <Toast ref={toast} position="top-left" />
      <form className="contact-form" onSubmit={sendEmail} id="form">
      <h2 style={{textAlign:'center', marginTop:'0px'}}>Formulario de contacto</h2>
      <p>Nombre: </p>
      <InputText name="from_name"  />
      <p>Correo: </p>
      <InputText name="reply_to"  />
      <p>Mensaje:</p>
      <InputTextarea
      style={{ height: "10rem", width:"40rem" }}
      name="message" 
      />
      <br/>
        <Button
        type="submit"
        label="Enviar consulta"
        style={{ }}
        alue="Send"
      ></Button>
    </form>
      
    </div>
    </Card>
  );
};
export default Contacto;
