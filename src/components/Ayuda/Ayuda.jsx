import { Accordion, AccordionTab } from "primereact/accordion";

const Ayuda = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Preguntas frecuentes</h1>
      <Accordion multiple>
        <AccordionTab header="¿Usar la plataforma tiene algún coste?">
          <p>
            No, Almarket 3D no tiene ningún coste, nos financiamos a través de nuestros
            patrocinadores y de la publicidad del portal. No tenemos previsión de incluir
            ningún tipo de pago por el uso de los servicios en el corto y medio plazo.
          </p>
        </AccordionTab>

        <AccordionTab header="¿Puedo cambiar mis datos de usuario como la dirección o el teléfono?">
          <p>
            Si, desde el apartado "Mis Datos", puedes cambiar los datos que necesites. En
            el caso de ser un usuario impresor, también puedes modificar los datos de tus
            impresoras, el tamaño o el precio.
          </p>
        </AccordionTab>

        <AccordionTab header="¿Puedo volver a descargar el modelo 3D de un pedido anterior?">
          <p>
            Si, los archivos permanecen almacenados en nuestro servidor de datos de manera
            que desde el apartado "mis pedidos", se puede volver a descargar cuantas veces
            sea necesario.
          </p>
        </AccordionTab>

        <AccordionTab header="¿Si le hago un pedido a un impresor mas económico, recibiré un producto de mala calidad?">
          <p>
            No, los precios los establecen los propios usuarios, y quizás hayan pueso un
            precio menor porque por la calidad o cantidad de máquinas el servicio le
            reporta mas beneficios, pero en ningún momento el sistema se ha concebido para
            que exista una relación entre el precio y la calidad
          </p>
        </AccordionTab>

        <AccordionTab header="¿Puedo pedir la impresión en cualquier color?">
          <p>
            Actualmente tenemos un catálogo de colores consensuado con los impresores y
            que abarca lo más comunes. La idea es que a corto plazo los impresores puedan
            modificar en cualquier momento la cantidad y diversidad de colores que pueden
            ofrecer, por lo que el mismo impresor pueda ampliar su catálogo de colores en
            cualquier momento.
          </p>
        </AccordionTab>

        <AccordionTab header="Tengo impresoras y quiero ofrecer mis servicios, ¿puedo también hacer pedidos con mi cuenta?">
          <p>
            Si, en el apartado "Mis Pedidos" podrás revisar tanto los pedidos que has
            hecho a otros impresores, como los que te han asignado a ti, así como cambiar
            el estado de los pedidos que te hayan hecho y descargar de nuevo el modelo a
            imprimir.
          </p>
        </AccordionTab>
      </Accordion>
    </div>
  );
};
export default Ayuda;
