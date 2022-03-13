import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { PanelMenu } from 'primereact/panelmenu';
import { Menu, } from 'primereact/menu';
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import "./MenuLateral.css";



const MenuLateral =()=>{
    const items = [
        {
          label: "Inicio",
          icon: "pi pi-home",
          url: "./"
        },
        {
          label: "Servicios",
          items: [
            {
              label: "Impresores",
              icon: "pi pi-print",
              url: "./ListaImpresores"
            },
            {
              label: "Nuevo pedido",
              icon: "pi pi-plus",
              url: "./NuevoPedido"
            },
            {
                label: "Mis pedidos",
                icon: "pi pi-list",
                url: "./MisPedidos"
              },
          ]
        },
        {
          label: "Usuario",
          items: [
            {
              label: "Mis datos",
              icon: "pi pi-user",
              url: "./DatosUsuario"
            },
            {
              label: "Ayuda",
              icon: "pi pi-question-circle",
              url: "./Ayuda"
            },

            {
              label: "Cerrar Sesión",
              icon: "pi pi-times"
            }
          ]
        },
        {
          label: "Otros",
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Option 1",
              icon: "pi pi-globe"
            },
            {
              label: "Option 2",
              icon: "pi pi-fw pi-user-minus"
            },
            {
              label: "Formulario - Test",
              icon: "pi pi-fw pi-users",
              url: "./FormularioRegistro"
            }
          ]
        }
      ];
    return(
        <>
        <Menu model={items} style={{}} />
        
        </>
    )
}
export default MenuLateral;