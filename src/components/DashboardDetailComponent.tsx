import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Dataset 2",
      data: labels.map(() => getRandomInt(100)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};
export const DashboardDetailComponent = () => {
  return (
    <div className="w-100">
      <div className="fs-6  mb-4">Balance</div>
      <div className="row mx-0 mb-2">
        <div className="col-6 p-0">
          <span>Total</span>
          <div>
            <b>12 980 €</b>
          </div>
        </div>
        <div className="col-3 p-0">
          <span>Capital</span>
          <div>
            <b>12 000€</b>
          </div>
        </div>
        <div className="col-3 p-0">
          <span>Profits</span>
          <div>
            <b>291€</b>
          </div>
        </div>
      </div>
      <div className="border-bottom">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};
