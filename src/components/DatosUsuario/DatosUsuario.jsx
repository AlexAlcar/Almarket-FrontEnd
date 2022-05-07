import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Http from "../../Helpers/Http";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Divider } from "primereact/divider";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const DatosUsuario = () => {
  const toastTL = useRef(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [userData, setUserData] = useState({
    id: "",
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    email: "",
    direccion: "",
    perfil: "",
    usuario: "",
    password: "",
    precio: null,
    tamanyo: null,
    impresoras: null,
  });
  const getDatosUsuario = async (id) => {
    const res = await Http.get(`/api/usuarios/find=${id}`);
    setUserData({
      ...userData,
      id: res._id,
      nombre: res.nombre,
      apellido1: res.apellido1,
      apellido2: res.apellido2,
      telefono: res.telefono,
      email: res.email,
      direccion: res.direccion,
      perfil: res.perfil,
      usuario: res.usuario,
      password: res.password,
      precio: res.precio,
      tamanyo: res.tamanyo,
      impresoras: res.impresoras,
    });
  };

  const modificarUsuario = async () => {
    var regex = /\d/g;
    var regexMail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(userData.nombre)) {
      setAlertMessage("Introduce un nombre vlaído");
      setAlertVisible(true);
    } else if (regex.test(userData.apellido1) || regex.test(userData.apellido2)) {
      setAlertMessage("Introduce solo letras");
      setAlertVisible(true);
    } else if (!regex.test(userData.telefono)) {
      setAlertMessage("Introduce un teléfono válido");
      setAlertVisible(true);
    } else if (!regexMail.test(userData.email)) {
      setAlertMessage("Email con formato incorrecto");
      setAlertVisible(true);
    } else {
      console.log("userData: ", userData);
      const res = Http.put(userData, `/api/usuarios/${userData.id}`);
      toastTL.current.show({
        severity: "success",
        summary: "Datos actualizados",
        detail: "Tus datos se han actualizado correctamente",
        life: 3000,
      });
    }
  };

  useEffect(() => {
    let id = Cookies.get("_id");
    getDatosUsuario(id);
  }, []);

  useEffect(() => {}, [userData]);

  return (
    <>
      <ConfirmDialog
        visible={alertVisible}
        message={alertMessage}
        closable={false}
        header="Error de datos"
        icon="pi pi-exclamation-triangle"
        footer={
          <Button
            onClick={() => {
              setAlertVisible(false);
              setAlertMessage("");
            }}
          >
            Aceptar
          </Button>
        }
      ></ConfirmDialog>

      <Toast ref={toastTL} position="top-left" />
      <Divider align="left" type="dashed">
        <b>Datos de usuario</b>
      </Divider>
      <div style={{ height: "50vw", margin: "1%", display: "flex" }}>
        <div class="flex align-items-center justify-content-center">
          <h5>Nombre: </h5>
          <Inplace closable>
            <InplaceDisplay>{userData.nombre || "Haz clic para editar"}</InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.nombre}
                onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>
          <h5>Primer Apellido: </h5>
          <Inplace closable>
            <InplaceDisplay>
              {userData.apellido1 || "Haz clic para editar"}
            </InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.apellido1}
                onChange={(e) => setUserData({ ...userData, apellido1: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>

          <h5>Segundo Apellido: </h5>
          <Inplace closable>
            <InplaceDisplay>
              {userData.apellido2 || "Haz clic para editar"}
            </InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.apellido2}
                onChange={(e) => setUserData({ ...userData, apellido2: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>

          <h5>Correo electrónico </h5>
          <Inplace closable>
            <InplaceDisplay>{userData.email || "Haz clic para editar"}</InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.email}
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>

          <h5>Teléfono </h5>
          <Inplace closable>
            <InplaceDisplay>{userData.telefono || "Haz clic para editar"}</InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.telefono}
                onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>

          <h5>Dirección </h5>
          <Inplace closable>
            <InplaceDisplay>
              {userData.direccion || "Haz clic para editar"}
            </InplaceDisplay>
            <InplaceContent>
              <InputText
                value={userData.direccion}
                onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
                autoFocus
              />
            </InplaceContent>
          </Inplace>
          <div style={{ marginTop: "20%" }}>
            <Button label="Guardar" onClick={() => modificarUsuario()} />
            &nbsp;&nbsp;&nbsp;
            <Button
              label="Descartar"
              onClick={() => (window.location.href = "/")}
              className="p-button-danger"
            />
          </div>
        </div>

        {userData.perfil === "impresor" ? (
          <div style={{ marginLeft: "10% " }}>
            <h5>Nº de impresoras </h5>
            <InputNumber
              style={{ width: "10px " }}
              value={userData.impresoras}
              onValueChange={(e) => setUserData({ ...userData, impresoras: e.value })}
              showButtons
              buttonLayout="horizontal"
              step={1}
              min={1}
              inputStyle={{ width: "150px", textAlign: "center" }}
              suffix=" impresora(s)"
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />

            <h5>Tamaño de impresión </h5>
            <InputNumber
              value={userData.tamanyo}
              onValueChange={(e) => setUserData({ ...userData, tamanyo: e.value })}
              showButtons
              buttonLayout="horizontal"
              step={0.1}
              min={1}
              max={100}
              inputStyle={{ width: "150px", textAlign: "center" }}
              suffix=" cm³"
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
            />

            <h5>Precio por unidad</h5>
            <InputNumber
              value={userData.precio}
              onValueChange={(e) => setUserData({ ...userData, precio: e.value })}
              showButtons
              buttonLayout="horizontal"
              step={0.1}
              inputStyle={{ width: "150px", textAlign: "center" }}
              min={1}
              max={1000}
              decrementButtonClassName="p-button-danger"
              incrementButtonClassName="p-button-success"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              mode="currency"
              currency="EUR"
            />
          </div>
        ) : (
          ""
        )}

        <br />
      </div>
    </>
  );
};
export default DatosUsuario;
