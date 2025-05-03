import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Card, CardBody } from "@heroui/react";
import axiosInstance from "../../../utils/axios/AxiosInstance";
import { DashboardResponseType } from "../../../utils/types/DashboardResponseType";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement, // Importando o LineElement para registrar
} from "chart.js";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Tooltip as LeafletTooltip,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import estados_loc from "../../../json/estados.json";
import NavBarDashboard from "./NavBarDashboard";
import { BsFileBarGraphFill } from "react-icons/bs";

// Registrando os elementos necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  LineElement // Registrando o LineElement
);

const AdminDashboard = () => {
  const [dashBoardData, setDashBoardData] =
    useState<DashboardResponseType | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null); // Referência para o gráfico

  const retrive_dashboard_data = async () => {
    // setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/dashboard/statistics");
      setDashBoardData(res.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    retrive_dashboard_data();

    // Destruir a instância do gráfico ao desmontar o componente
    return () => {
      if (chartRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartRef.current.destroy();
      }
    };
  }, []);

  const MONTHS = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  // Gráfico de Crescimento Mensal
  const sortedGrowth =
    dashBoardData?.growth_rate?.sort(
      (a, b) => a.year * 12 + a.month - (b.year * 12 + b.month)
    ) ?? [];

  const chart_data = {
    labels: sortedGrowth.map((item) => `${MONTHS[item.month]}/${item.year}`),
    datasets: [
      {
        label: "Crescimento (%)",
        data: sortedGrowth.map((item) => item.userGrowth),
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79, 70, 229, 0.3)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Gráfico de Interesses
  const labels = dashBoardData?.popular_interests.map((interest) => {
    const interestName = interest.interest;
    const firstLetter = interestName.charAt(0).toUpperCase();
    const restOfString = interestName.slice(1);
    return firstLetter + restOfString;
  });

  const data = dashBoardData?.popular_interests.map(
    (interest) => interest.count
  );

  const interests_chart_data = {
    labels: labels,
    datasets: [
      {
        label: "Distribuição de Interesses",
        data: data,
        backgroundColor: [
          "#4f46e5",
          "#3b82f6",
          "#22c55e",
          "#fbbf24",
          "#ef4444",
          "#9333ea",
          "#ec4899",
          "#f97316",
        ],
      },
    ],
  };

  // Gráfico de Cidades
  // const citiesChartData = {
  //   labels: dashBoardData?.user_locations.map((location) => location.location),
  //   datasets: [
  //     {
  //       label: "Distribuição por Cidades",
  //       data: dashBoardData?.user_locations.map((location) => location.count),
  //       backgroundColor: [
  //         "#4f46e5",
  //         "#3b82f6",
  //         "#22c55e",
  //         "#fbbf24",
  //         "#ef4444",
  //         "#9333ea",
  //         "#ec4899",
  //         "#f97316",
  //       ],
  //     },
  //   ],
  // };

  // Gráfico de Níveis de Entusiasta
  const enthusiastLevels = dashBoardData?.enthusiast_levels?.map(
    (level) => level.level
  );
  const enthusiastCounts = dashBoardData?.enthusiast_levels?.map(
    (level) => level.count
  );

  const enthusiastChartData = {
    labels: enthusiastLevels,
    datasets: [
      {
        label: "Distribuição de Níveis de Entusiasta",
        data: enthusiastCounts,
        backgroundColor: "#4f46e5", // Cor das barras
      },
    ],
  };

  const MapCenter = () => {
    const map = useMap(); // Usando a hook useMap para acessar o mapa
    useEffect(() => {
      // Centralizando no Brasil e definindo o zoom
      map.setView([-14.235, -51.9253] as LatLngExpression, 4); // Latitude e longitude do Brasil
    }, [map]);

    return null;
  };

  const getStateCoordinates = (location: string): [number, number] => {
    const state = estados_loc.find(
      (estado) =>
        estado.nome.toLowerCase() === location.toLowerCase() ||
        estado.uf.toLowerCase() === location.toLowerCase()
    );

    if (state) {
      return [state.latitude, state.longitude];
    }

    // Fallback para o centro do Brasil
    return [-14.235, -51.9253];
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full h-full">
      <NavBarDashboard />

      <div className="flex flex-col gap-5">
        <h2 className="font-bold text-2xl flex gap-2 items-center">
          <BsFileBarGraphFill />
          Estatísticas
        </h2>
        <div className="flex items-center justify-between w-full h-[24rem] gap-4">
          {/* Cartões de Dados */}
          <motion.div
            className="w-1/3 h-full" // Limita o cartão de "Usuários Cadastrados" a 1/3 da largura
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-lg p-6 h-full">
              <CardBody className="flex flex-col items-center justify-between">
                <h2 className="text-xl font-semibold">Usuários Cadastrados</h2>
                <div>
                  <p className="font-bold text-2xl">
                    {dashBoardData?.total_users}
                  </p>
                </div>
                <p className="text-gray-500">Usuários</p>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div
            className="w-1/3 h-full" // Limita o cartão de "Número de Interações" a 1/3 da largura
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg p-6 h-full">
              <CardBody className="flex flex-col items-center justify-between">
                <h2 className="text-xl font-semibold">Número de Interações</h2>
                <p className="text-2xl">{dashBoardData?.total_interactions}</p>
                <p className="text-gray-500">Interações</p>
              </CardBody>
            </Card>
          </motion.div>

          {/* Cartão de Crescimento Mensal de Usuários agora ocupando o espaço restante */}
          <motion.div
            className="w-[60em] h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="shadow-lg p-6 h-full">
              <CardBody className="flex flex-col items-center justify-between h-full">
                <h2 className="text-xl font-semibold mb-4">
                  Crescimento Mensal de Usuários
                </h2>
                <div className="w-full h-[15rem]">
                  <Line
                    ref={chartRef}
                    data={chart_data}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false, // ESSENCIAL para ocupar toda a altura
                      scales: {
                        x: {
                          beginAtZero: true,
                        },
                        y: {
                          beginAtZero: true,
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top",
                        },
                      },
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <div className="flex items-center justify-center w-full h-[24rem] gap-4">
          {/* Gráfico de Interesses */}
          <motion.div
            className="w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="shadow-lg p-6 rounded-lg h-full">
              <CardBody className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl font-semibold mb-4">Interesses</h2>
                <div className="w-full h-[200px]">
                  <Pie
                    data={interests_chart_data}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Gráfico de Níveis de Entusiasta */}
          <motion.div
            className="w-1/3 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Card className="shadow-lg p-6 rounded-lg h-full">
              <CardBody className="flex flex-col items-center justify-center h-full">
                <h2 className="text-xl font-semibold mb-4">
                  Níveis de Entusiasta
                </h2>
                <div className="w-full h-[200px]">
                  <Bar
                    data={enthusiastChartData}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col items-center justify-center w-full gap-6 p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Card className="w-full  shadow-lg">
            <CardBody className="flex flex-col items-center justify-center p-6">
              <h2 className="font-bold text-xl mb-4">Mapa de Calor</h2>

              <MapContainer
                style={{
                  height: "500px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              >
                <MapCenter />
                <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* CircleMarkers com lógica existente */}
                {(() => {
                  const minRadius = 2;
                  const maxRadius = 10;

                  const maxCount = Math.max(
                    ...(dashBoardData?.user_locations?.map((u) => u.count) || [
                      1,
                    ])
                  );

                  return dashBoardData?.user_locations.map((location) => {
                    const coordinates = getStateCoordinates(location.location);
                    const scaledRadius =
                      (location.count / maxCount) * (maxRadius - minRadius) +
                      minRadius;

                    return (
                      <CircleMarker
                        key={location.location}
                        center={coordinates as [number, number]}
                        radius={scaledRadius}
                        color="#4f46e5"
                        fillOpacity={0.5}
                      >
                        <LeafletTooltip>
                          <span>{`${location.location}: ${location.count}`}</span>
                        </LeafletTooltip>
                      </CircleMarker>
                    );
                  });
                })()}
              </MapContainer>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
