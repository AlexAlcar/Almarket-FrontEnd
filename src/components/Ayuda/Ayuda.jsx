import { Accordion, AccordionTab } from 'primereact/accordion';

const Ayuda = () => {

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Preguntas frecuentes</h1>
            <Accordion multiple>
                <AccordionTab header="¿Usar la plataforma tiene algún coste?">
                    <p>No, Almarket 3D no tiene ningún coste, nos financiamos a través de nuestros patrocinadores y
                        de la publicidad del portal. No tenemos previsión de incluir ningún tipo de pago por el uso de
                        los servicios en el corto y medio plazo.
                    </p>
                </AccordionTab>

                <AccordionTab header="¿Puedo cambiar mis datos de usuario como la dirección o el teléfono?">
                    <p>Si, desde el apartado "Mis Datos", puedes cambiar los datos que necesites. En el caso de ser un usuario impresor,
                        también puedes modificar los datos de tus impresoras, el tamaño o el precio.
                    </p>
                </AccordionTab>

                <AccordionTab header="¿Puedo volver a descargar el modelo 3D de un pedido anterior?">
                    <p>Si, los archivos permanecen almacenados en nuestro servidor de datos de manera que desde el apartado "mis pedidos",
                        se puede volver a descargar cuantas veces sea necesario.
                    </p>
                </AccordionTab>

                <AccordionTab header="¿Si le hago un pedido a un impresor mas económico, recibiré un producto de mala calidad?">
                    <p>No, los precios los establecen los propios usuarios, y quizás hayan pueso un precio menor porque por 
                        la calidad o cantidad de máquinas el servicio le reporta mas beneficios, pero en ningún momento el sistema
                        se ha concebido para que exista una relación entre el precio y la calidad
                    </p>
                </AccordionTab>

                <AccordionTab header="¿Si le hago un pedido a un impresor mas económico, recibiré un producto de mala calidad?">
                    <p>No, los precios los establecen los propios usuarios, y quizás hayan pueso un precio menor porque por 
                        la calidad o cantidad de máquinas el servicio le reporta mas beneficios, pero en ningún momento el sistema
                        se ha concebido para que exista una relación entre el precio y la calidad
                    </p>
                </AccordionTab>

            </Accordion>

        </div>
    )
}
export default Ayuda;
