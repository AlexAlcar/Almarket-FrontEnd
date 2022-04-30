import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { PanelMenu } from 'primereact/panelmenu';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Cookies from 'js-cookie';
import { Menu, } from 'primereact/menu';
import "./MenuLateral.css";



const MenuLateral = () => {
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
          label: "Lista de impresores",
          icon: "pi pi-print",
          url: "./ListaImpresores"
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
          icon: "pi pi-times",
          command: () => {
            confirmDialog({
              message: '¿Seguro que deseas cerrar sesión?',
              header: 'Cerrar Sesión',
              icon: 'pi pi-exclamation-triangle',
              accept,
              reject
            });
          }
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
        }
      ]
    }
  ];

  const accept = () => {
    console.log("accept");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(false);
  }
  const reject = () => {
    //Toast.currents.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  }
  return (
    <>
      <p style={{textAlign:'center'}}>Hola {Cookies.get('username')}</p>
      <Menu model={items} style={{height:'95%', width:'100%'}} />

    </>
  )
}
export default MenuLateral;