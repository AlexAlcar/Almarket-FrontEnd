import React, { useState, useEffect, useRef } from "react";
import Http from "../../Helpers/Http";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import Cookies from "js-cookie";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Tooltip } from "primereact/tooltip";
import { Calendar } from "primereact/calendar";
import { addLocale } from "primereact/api";
import { confirmDialog } from "primereact/confirmdialog";
import { Card } from "primereact/card";

const NuevoPedido = ({ verNuevoPedido, impresorElegido, setverNuevoPedido }) => {
  const toast = useRef(null);
  const [ficheroSubido, setFicheroSubido] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState({
    id_usuario: null,
    id_impresor: null,
    usuario_impresor: null,
    usuario: null,
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
  });
  const [setVisibilidad] = useState(verNuevoPedido);
  addLocale("es", {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Claro",
  });

  const borrarPedido = () => {
    setNuevoPedido({
      id_usuario: null,
      id_impresor: null,
      usuario_impresor: null,
      usuario: null,
      descripcion: null,
      cantidad: null,
      tamanyo: null,
      material: null,
      direccion: null,
      fecha_entrega: null,
      estado: null,
      color: null,
      comentarios: null,
      precioTotal: null,
      fichero: null,
    });
  };

  const chequeoDatos = (mensaje) => {
    confirmDialog({
      message: mensaje,
      header: "Error de validación",
      icon: "pi pi-exclamation-triangle",
      footer: <></>,
    });
  };

  const prepararNuevoPedido = () => {
    //Compruebo datos y termino de preparar el objeto a enviar.
    if (!nuevoPedido.cantidad) chequeoDatos("Debes elegir una cantidad");
    if (!nuevoPedido.material) chequeoDatos("Debes elegir un material");
    if (!nuevoPedido.tamanyo) chequeoDatos("Debes elegir un tamaño mínimo");
    if (!nuevoPedido.color) chequeoDatos("Debes elegir un color");
    if (!nuevoPedido.descripcion) chequeoDatos("Debes escribir una descripción");
    if (!nuevoPedido.fichero) chequeoDatos("Debes subir un modelo antes de crear el pedido");
    //console.log("Fichero: ", fichero);
    console.log("Impresor elegido: ", impresorElegido);
    console.log("Nuevo Pedido: ", nuevoPedido);
    crearPedido();
  };

  const crearPedido = async () => {
    const res = await Http.post(nuevoPedido, "/api/pedidos/");
    console.log("respuesta: ", res);

    setverNuevoPedido(false);
    confirmDialog({
      message: 'Puedes consultar los detalles del pedido en el apartado "Mis Pedidos"',
      header: "Pedido creado correctamente",
      icon: "pi pi-check-circle",
      footer: <></>,
    });
  };

  useEffect(() => {
    borrarPedido();
    //guardo en el pedido los Id's del solicitante y el impresor
    setNuevoPedido({
      ...setNuevoPedido,
      id_usuario: Cookies.get("_id"),
      usuario: Cookies.get("username"),
      id_impresor: impresorElegido._id,
      usuario_impresor: impresorElegido.usuario,
      direccion: impresorElegido.direccion,
      estado: "iniciado",
    });
  }, []);

  return (
    <>
      <Toast ref={toast} />

      <Card
        style={{ width: "60rem", paddingRight: "1%", paddingLeft: "1%" }}
        className="p-sidebar-lg"
        onHide={() => setVisibilidad(false)}
      >
        <div className="card">
          <div className="p-fluid formgrid grid">
            <div style={{ float: "left", marginLeft: "20%" }}>
              <label htmlFor="date">Cantidad:</label>
              <br />
              <InputNumber
                autoFocus
                inputId="minmax-buttons"
                mode="decimal"
                showButtons
                value={nuevoPedido.cantidad}
                min={1}
                max={999}
                onChange={(e) =>
                  setNuevoPedido({
                    ...nuevoPedido,
                    cantidad: e.value,
                    precioTotal: e.value * impresorElegido.precio,
                  })
                }
                style={{ width: "200px" }}
              />
              <br />
              <br />

              <label htmlFor="date">Tamaño:</label>
              <br />
              <InputNumber
                inputId="minmax-buttons"
                mode="decimal"
                showButtons
                suffix=" cm³"
                step={0.1}
                min={1}
                max={impresorElegido.tamanyo}
                onChange={(e) =>
                  setNuevoPedido({ ...nuevoPedido, tamanyo: Math.round(e.value * 10) / 10 })
                }
                style={{ width: "200px" }}
              />
              <br />
              <br />

              <label>Color: </label>
              <br />
              <Dropdown
                options={[
                  "blanco",
                  "negro",
                  "gris",
                  "azul",
                  "rojo",
                  "verde",
                  "amarillo",
                  "rosa",
                  "marrón",
                  "naranja",
                ]}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, color: e.value })}
                value={nuevoPedido.color}
                style={{ width: "200px" }}
              />
              <br />
              <br />
              <br />
            </div>
            <div style={{ float: "right", marginRight: "20%" }}>
              <label htmlFor="date">Material:</label>
              <Dropdown
                options={["PLA", "PETG", "FilaFlex", "ABS"]}
                style={{ width: "200px" }}
                value={nuevoPedido.material}
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, material: e.value })}
              />
              <br />
              <label htmlFor="date">Fecha Máxima:</label>
              <Calendar
                style={{ width: "200px" }}
                id="spanish"
                onChange={(e) =>
                  setNuevoPedido({ ...nuevoPedido, fecha_entrega: e.value.toLocaleString() })
                }
                locale="es"
                dateFormat="dd/mm/yy"
              />
              <br />
              <h3>Precio total: {nuevoPedido.precioTotal}€</h3>
            </div>
            <div style={{ float: "bottom" }}>
              <InputTextarea
                id="color"
                style={{ height: "150px" }}
                placeholder="Descripción / Datos adicionales"
                onChange={(e) => setNuevoPedido({ ...nuevoPedido, descripcion: e.target.value })}
              />

              <div>
                <Tooltip target=".custom-choose-btn" content="Elegir" position="bottom" />
                <div>
                  {ficheroSubido ? (
                    <p>
                      <i className="pi pi-check-circle"></i> Modelo 3D subido correctamente
                    </p>
                  ) : (
                    <>
                      <p>Subir fichero .stl: </p>
                      <FileUpload
                        name="stl"
                        mode="basic"
                        url="http://localhost:8080/api/pedidos/subirSTL"
                        onUpload={(res) => {
                          console.log(res.xhr.response);
                          //let tmp=JSON.parse(res.xhr.response);
                          //console.log("temp: ",tmp.filename);
                          setNuevoPedido({
                            ...nuevoPedido,
                            fichero: JSON.parse(res.xhr.response).filename,
                          });
                          setFicheroSubido(true);
                        }}
                        accept=".stl"
                        maxFileSize={1000000}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div style={{ textAlign: "center" }}>
          <Button
            label="Atrás"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => setverNuevoPedido(false)}
          />
          <Button label="Crear" icon="pi pi-check" onClick={() => prepararNuevoPedido()} />
        </div>
      </Card>
    </>
  );
};
export default NuevoPedido;
