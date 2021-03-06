import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import Http from "../Helpers/Http";
import React, { useEffect, useState } from "react";
import { StlViewer } from "react-stl-viewer";
import { Divider } from "primereact/divider";

const PantallaInicial = ({ authorized }) => {
  //crear un array que será la fuente de datos en DATA
  const [chartUserData, setChartUserData] = useState([]);
  const [chartPedidosData, setChartPedidosData] = useState([]);
  const [lastModel, setLastModel] = useState();
  const [lastModel2, setLastModel2] = useState();
  const [loaded, setLoaded]=useState(false);
  const [chartUsuarios, setChartUsuarios] = useState({
    labels: ["Solicitantes", "Impresores"],
    datasets: [
      {
        data: chartUserData,
        backgroundColor: ["#66BB6A", "#FFA726"],
        hoverBackgroundColor: ["#81C784", "#FFB74D"],
      },
    ],
  });
  const [lightOptions] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });
  const [chartPedidos, setChartPedidos] = useState({
    labels: [
      "Pedidos en estado inicial",
      "Pedidos imprimiendo",
      "Pedidos en envío",
      "Pedidos finalizados",
    ],
    datasets: [
      {
        data: [chartPedidosData],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#36A2EB"],
      },
    ],
  });
  const [lightOptions2] = useState({
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  });
  const [basicData] = useState({
    labels: ["U1", "U2", "U3", "U4", "U5"],
    datasets: [
      {
        label: "Nº de pedidos",
        backgroundColor: "#707830",
        data: [65, 59, 80, 81, 56]
      }
    ]
  });
  const getLightTheme = () => {
    let horizontalOptions = {
      indexAxis: "y",
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: { legend: { labels: { color: "#495057" } } },
      scales: {
        x: {
          ticks: { color: "#495057" },
          grid: { color: "#ebedef" }
        },
        y: {
          ticks: { color: "#495057" },
          grid: { color: "#ebedef" }
        }
      }
    };
    return { horizontalOptions };
  };
  const { horizontalOptions } = getLightTheme();

  const getData = async () => {
    let conteoUsuarios = 0;
    let conteoImpresores = 0;
    let conteoPedidosIni = 0;
    let conteoPedidosImpr = 0;
    let conteoPedidosEnv = 0;
    let conteoPedidosFin = 0;

    const resUsuarios = await Http.get("/api/usuarios/");
    const resPedidos = await Http.get("/api/pedidos/");


    window.localStorage.setItem('lastmodel1', resPedidos[resPedidos.length - 1].fichero);
    window.localStorage.setItem('lastmodel2', resPedidos[resPedidos.length - 2].fichero);
    resUsuarios.forEach((e) => {
      if (e.perfil === "impresor") conteoImpresores++;
      else conteoUsuarios++;
    });

    resPedidos.forEach((e) => {
      switch (e.estado) {
        case "iniciado":
          conteoPedidosIni++;
          break;
        case "imprimiendo":
          conteoPedidosImpr++;
          break;
        case "enviado":
          conteoPedidosEnv++;
          break;
        case "finalizado":
          conteoPedidosFin++;
          break;
        case "cerrado":
          conteoPedidosFin++;
          break;
        default:
          break;
      }
    });

    setChartUsuarios({
      ...chartUsuarios,
      datasets: [
        {
          data: [conteoUsuarios, conteoImpresores],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFA726"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFB74D"],
        },
      ],
    });

    setChartPedidos({
      ...chartPedidos,
      datasets: [
        {
          data: [conteoPedidosIni, conteoPedidosImpr, conteoPedidosEnv, conteoPedidosFin],
          backgroundColor: ["#42A5F5", "#66BB6A", "#FFCE56", "#FF6384"],
          hoverBackgroundColor: ["#64B5F6", "#81C784", "#FFA726", "#FF6384"],
        },
      ],
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
   if (lastModel) setLoaded(true);
  }, [lastModel]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: 'center', marginTop: '40px' }}>

        <div>
          <Card style={{ display: "flex", marginLeft: '10%', justifyContent: 'center' }}>
            <h2 style={{ textAlign: 'center', marginTop: '0px' }}>Estadísticas de usuarios</h2>
            <Chart
              type="doughnut"
              data={chartUsuarios}
              options={lightOptions}
              style={{ width: "35vw" }}
            />
          </Card>
        </div>
        <div>
          <Card style={{ display: "flex", marginLeft: '10%', justifyContent: 'center' }}>
            <h2 style={{ textAlign: 'center', marginTop: '0px' }}>Estadísticas de pedidos</h2>
            <Chart
              type="doughnut"
              data={chartPedidos}
              options={lightOptions2}
              style={{ width: "35vw" }}
            />
          </Card>
        </div>
      </div>
      <Divider align="center">
                    <h1 >Últimos modelos impresos</h1>
                </Divider>
      
      
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <div>
          <div style={{ textAlign: 'center', marginLeft: '10%', display: "flex", justifyContent: 'center' }}>
            <StlViewer
              style={{
                top: 0,
                left: 0,
                width: '40vw',
                height: '35vw',
               
              }}
              orbitControls
              shadows
              modelProps={{ color: 'blue' }}
              url={`http://84.127.70.11:8000/uploads/${window.localStorage.getItem('lastmodel1')}`}
            />
          </div>
        </div>
        <div>
          <div style={{ textAlign: 'center', marginLeft: '10%', display: "flex", justifyContent: 'center' }}>
            <StlViewer
              style={{
                top: 0,
                left: 0,
                width: '40vw',
                height: '35vw'
              }}
              orbitControls
              shadows
              modelProps={{ color: 'green' }}
              crossOrigin='null'
              url={`http://84.127.70.11:8000/uploads/${window.localStorage.getItem('lastmodel2')}`}
              
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default PantallaInicial;
