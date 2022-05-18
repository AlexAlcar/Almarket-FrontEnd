import React, { useState, useEffect, useRef } from "react";
import Http from "../../Helpers/Http";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import Cookies from "js-cookie";
import { Card } from "primereact/card";
import NuevoPedido from "../NuevoPedido/NuevoPedido";

const ListaImpresores = ({ authorized }) => {
  const [impresores, setImpresores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foolDetector, setFoolDetector] = useState(false);
  const [verNuevoPedido, setverNuevoPedido] = useState(false);
  const [impresorElegido, setImpresorElegido] = useState({
    apellido1: null,
    apellido2: null,
    email: null,
    direccion: null,
    impresoras: null,
    tamanyo: null,
    perfil: null,
    precio: null,
    colores: [],
    nombre: null,
    password: null,
    puntuacion: null,
    telefono: null,
    usuario: null,
    valoraciones: null,
    _id: null,
    stars:null,
  });
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);

  const getListaImpresores = async () => {
    const dataSource = await Http.get("/api/usuarios/getImpresores");
    //console.log(dataSource);
    
    setImpresores(dataSource);
    impresores.map((e)=>{
      if (e.perfil==='impresor') e.stars=e.puntuacion/e.valoraciones;
    });
    console.log(impresores);
  };

  const ratingTemplate = (rowData) => {
    return (
      <>
        <Rating
          value={parseInt(rowData.puntuacion) / parseInt(rowData.valoraciones)}
          readOnly
          cancel={false}
          style={{ display: "inline" }}
        />{" "}
        ({rowData.valoraciones})
      </>
    );
  };
  const priceBodyTemplate = (rowData) => {
    return rowData.precio + " €/ud";
  };
  const tamanyoTemplate = (rowData) => {
    return rowData.tamanyo + " cm³";
  };

  const handleClickNuevoPedido = (rowData) => {
    return (
      <Button
        id="button"
        label="Nuevo pedido"
        className="p-button-raised p-button-text p-button-sm "
        icon="pi pi-plus-circle"
        onClick={() => {
          confirmDialog({
            message: "¿Seguro que quieres hacer un pedido a " + rowData.usuario + "?",
            icon: "pi pi-info-circle",
            accept: () => {
              setLoading(true);
              //setLoading(false);

              setImpresorElegido({
                ...impresorElegido,
                nombre: rowData.nombre,
                apellido1: rowData.apellido1,
                apellido2: rowData.apellido2,
                telefono: rowData.telefono,
                email: rowData.email,
                perfil: rowData.perfil,
                colores: rowData.colores,
                direccion: rowData.direccion,
                impresoras: rowData.impresoras,
                tamanyo: rowData.tamanyo,
                password: rowData.password,
                puntuacion: rowData.puntuacion,
                precio: rowData.precio,
                usuario: rowData.usuario,
                valoraciones: null,
                _id: rowData._id,
                stars:null,
              });
              //console.log(impresorElegido.usuario);
              if (rowData._id == Cookies.get("_id")) {
                setFoolDetector(true);
                setLoading(false);
              } else setverNuevoPedido(true);
            },
          });
        }}
      />
    );
  };
 


  useEffect(() => {
    getListaImpresores();
    
    //console.log("authorized:", authorized)
  }, []);

  useEffect(() => { }, [loading]);

  return (
    <Card style={{ height: "50vw" }}>
      <Dialog
        header={"Crear nuevo pedido a " + impresorElegido.usuario}
        visible={verNuevoPedido}
        onHide={() => setverNuevoPedido(false)}
        breakpoints={{ "960px": "75vw" }}
        style={{ width: "auto" }}
      >
        <NuevoPedido
          impresorElegido={impresorElegido}
          setverNuevoPedido={setverNuevoPedido}
        />
      </Dialog>
      <ConfirmDialog
        visible={foolDetector}
        message="No puedes hacerte un pedido a ti mismo."
        closable={false}
        header="Aviso"
        icon="pi pi-exclamation-triangle"
        footer={
          <Button
            onClick={() => {
              setFoolDetector(false);
            }}
          >
            Aceptar
          </Button>
        }
      ></ConfirmDialog>
      <Toast ref={toast} />
      <DataTable
        value={impresores}
        datakey="_id"
        header="Lista completa de impresores"
        responsiveLayout="stack"
        paginator
        className="p-datatable-customers"
        rows={10}
        globalFilterFields={["usuario", "nombre", "apellido1"]}
        filterDisplay="row"
        size="small"
        emptyMessage="No se ha encontrado ningún impresor."
      >
        <Column
          field="usuario"
          header="Usuario"
          sortable
          filter
          filterPlaceholder="Buscar por usuario"
          className="p-inputtext-sm block mb-2"
          style={{ width: "15%" }}
        />
        <Column field="impresoras" header="Impresoras" sortable />
        <Column field="tamanyo" header="Tamaño máximo" body={tamanyoTemplate} sortable />
        <Column field="precio" header="Precio" body={priceBodyTemplate} sortable />
        <Column
          field="valoraciones"
          header="Valoraciones"
          body={ratingTemplate}
          sortable
        />
        <Column body={handleClickNuevoPedido} />
      </DataTable>
    </Card>
  );
};
export default ListaImpresores;
