import { Navigate } from "react-router";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { Divider } from "primereact/divider";
import Http from "../Helpers/Http";
import React, { useEffect, useState } from "react";
//import 'primeflex/primeflex.css';

const PantallaInicial = ({ authorized }) => {
  //crear un array que será la fuente de datos en DATA
  const [chartUserData, setChartUserData] = useState([]);
  const [chartPedidosData, setChartPedidosData] = useState([]);
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

  const getData = async () => {
    let conteoUsuarios = 0;
    let conteoImpresores = 0;
    let conteoPedidosIni = 0;
    let conteoPedidosImpr = 0;
    let conteoPedidosEnv = 0;
    let conteoPedidosFin = 0;
    const resUsuarios = await Http.get("/api/usuarios/");
    const resPedidos = await Http.get("/api/pedidos/");

    //console.log(resPedidos.length);
    //array1.forEach(element => console.log(element));
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

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <Card title="Estadísticas de usuarios" style={{ width: "40em" }}>
            <Chart
              type="doughnut"
              data={chartUsuarios}
              options={lightOptions}
              style={{ width: "30em" }}
            />
          </Card>
        </div>
        <div>
          <Card title="Estadísticas de pedidos" style={{ width: "40em" }}>
            <Chart
              type="doughnut"
              data={chartPedidos}
              options={lightOptions2}
              style={{ width: "30em" }}
            />
          </Card>
        </div>
      </div>
    </>
  );
};
export default PantallaInicial;
