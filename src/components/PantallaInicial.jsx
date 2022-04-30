import { Navigate } from "react-router";
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { Divider } from 'primereact/divider';
import Http from "../Helpers/Http";
import React, { useEffect, useState } from 'react';
//import 'primeflex/primeflex.css';

const PantallaInicial = ({ authorized }) => {
    //crear un array que será la fuente de datos en DATA
    const[chartUserData, setChartUserData]=useState([]);
    const [chartUsuarios, setChartUsuarios] = useState({
        labels: ['Usuarios totales', 'Solicitantes', 'Impresores'],
        datasets: [
            {
                data: chartUserData,
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    });

    const [lightOptions] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });


    const [chartPedidos, setChartPedidos] = useState({
        labels: ['Pedidos Totales', 'Pedidos en proceso', 'Pedidos entregados'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }]
    });

    const [lightOptions2] = useState({
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        }
    });

    const getData=async()=>{
        let usuariosTotales, conteoImpresores, conteoUsuarios;
        let pedidosTotales, conteoPedidosEnProceso, conteoPedidosEntregados;
        const resUsuarios = await Http.get("/api/usuarios/");
        const resPedidos = await Http.get("/api/pedidos/");

        //console.log(resPedidos.length);
        setChartUsuarios({...chartUsuarios,
        datasets:[
            {
                data: [resUsuarios.length,20,30],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
        })
         
        //setChartUserData(2, 100, 100);

        //console.log(chartUserData);

        //console.log(usuariosTotales)


        
    }


    useEffect(() => {
        getData();
    }, []);


    return (
        <>
            <div style={{display:'flex'}}>
            
                <div >
                <Card title="Estadísticas de usuarios" style={{ width:'40em'}}>
                <Chart type="pie" data={chartUsuarios} options={lightOptions} style={{  width: '30em' }} />
            </Card>
                </div>
                <div >
                <Card title="Estadísticas de pedidos" style={{ width:'40em' }}>
                <Chart type="doughnut" data={chartPedidos} options={lightOptions2} style={{  width: '30em' }} />
            </Card>
                </div>
            </div>
        

        </>


    )
}
export default PantallaInicial;
