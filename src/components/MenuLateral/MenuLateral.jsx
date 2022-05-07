import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import { confirmDialog } from "primereact/confirmdialog";
import Cookies from "js-cookie";
import { Menu } from "primereact/menu";
import "./MenuLateral.css";

const MenuLateral = () => {
  const items = [
    {
      label: "Inicio",
      icon: "pi pi-home",
      url: "./",
    },
    {
      label: "Servicios",
      items: [
        {
          label: "Lista de impresores",
          icon: "pi pi-print",
          url: "./ListaImpresores",
        },
        {
          label: "Mis pedidos",
          icon: "pi pi-list",
          url: "./MisPedidos",
        },
      ],
    },
    {
      label: "Usuario",
      items: [
        {
          label: "Mis datos",
          icon: "pi pi-user",
          url: "./DatosUsuario",
        },
        {
          label: "FAQ",
          icon: "pi pi-question-circle",
          url: "./Ayuda",
        },
        {
          label: "Contacto",
          icon: "pi pi-envelope",
          url: "./Contacto",
        },
        {
          label: "Cerrar Sesión",
          icon: "pi pi-times",
          command: () => {
            confirmDialog({
              message: "¿Seguro que deseas cerrar sesión?",
              header: "Cerrar Sesión",
              icon: "pi pi-exclamation-triangle",
              accept,
              reject,
            });
          },
        },
      ],
    },
    {
      label: "Nuestras redes",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Facebook",
          icon: "pi pi-facebook",
          url: "https://www.facebook.com/",
        },
        {
          label: "Twitter",
          icon: "pi pi-fw pi-twitter",
          url: "https://twitter.com/home?lang=es",
        },
        {
          label: "Linkedin",
          icon: "pi pi-fw pi-linkedin",
          url: "https://www.linkedin.com/",
        },
        {
          label: "Youtube",
          icon: "pi pi-fw pi-youtube",
          url: "https://www.youtube.com/",
        },
      ],
    },
  ];

  const accept = () => {
    console.log("accept");
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rol=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(false);
  };
  const reject = () => {
    //Toast.currents.show({ severity: 'info', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  };
  return (
    <>
      <p style={{ textAlign: "center" }}>Bienvenid@ {Cookies.get("username")}</p>
      <Menu model={items} style={{ height: "100%", width: "100%" }} />
    </>
  );
};
export default MenuLateral;
