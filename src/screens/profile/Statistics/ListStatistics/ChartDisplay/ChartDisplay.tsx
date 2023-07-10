import { useEffect, useState, JSX } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./ChartDisplay.css";
import { ChartDisplayProps } from "../../Statistics.types";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const ChartDisplay = ({
  labels,
  chartType,
  currentlyEngaging,
  completed,
  dropped,
  onHold,
  planTo,
  totalEntries,
}: ChartDisplayProps): JSX.Element => {
  const [barChartData, setBarChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: `Total Entries: ${totalEntries}`,
        data: [currentlyEngaging, completed, dropped, onHold, planTo],
        backgroundColor: [
          "rgba(0, 0, 255, 0.2)",
          "rgba(8, 255, 8, 0.2)",
          "rgba(255, 0, 0, 0.2)",
          "rgba(255, 165, 0, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: [
          "rgb(0, 0, 255)",
          "rgb(8, 255, 8)",
          "rgb(255, 0, 0)",
          "rgb(255, 165, 0)",
          "rgb(128, 128, 128)",
        ],
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  });
  const [barchartOptions, setBarChartOptions] = useState({
    plugins: {
      legend: {
        display: true,
        labels: {
          boxWidth: 0,
        },
      },
    },
    scales: {
      y: {
        suggestedMin: 0,
        suggestedMax: totalEntries,
      },
    },
    maintainAspectRatio: false,
  });
  const [pieChartData, setPieChartData] = useState({
    labels: labels,
    datasets: [
      {
        data: [currentlyEngaging, completed, dropped, onHold, planTo],
        backgroundColor: [
          "rgba(0, 0, 255, 0.2)",
          "rgba(8, 255, 8, 0.2)",
          "rgba(255, 0, 0, 0.2)",
          "rgba(255, 165, 0, 0.2)",
          "rgba(128, 128, 128, 0.2)",
        ],
        borderColor: [
          "rgb(0, 0, 255)",
          "rgb(8, 255, 8)",
          "rgb(255, 0, 0)",
          "rgb(255, 165, 0)",
          "rgb(128, 128, 128)",
        ],
        borderWidth: 1,
        barPercentage: 0.5,
      },
    ],
  });
  const [pieChartOptions, setChartPieOptions] = useState({
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  });

  useEffect(() => {
    const barChartDataObj = {
      labels: labels,
      datasets: [
        {
          label: `Total Entries: ${totalEntries}`,
          data: [currentlyEngaging, completed, dropped, onHold, planTo],
          backgroundColor: [
            "rgba(0, 0, 255, 0.2)",
            "rgba(8, 255, 8, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 165, 0, 0.2)",
            "rgba(128, 128, 128, 0.2)",
          ],
          borderColor: [
            "rgb(0, 0, 255)",
            "rgb(8, 255, 8)",
            "rgb(255, 0, 0)",
            "rgb(255, 165, 0)",
            "rgb(128, 128, 128)",
          ],
          borderWidth: 1,
          barPercentage: 0.5,
        },
      ],
    };

    const barChartOptionsObj = {
      plugins: {
        legend: {
          display: true,
          labels: {
            boxWidth: 0,
          },
        },
      },
      scales: {
        y: {
          suggestedMin: 0,
          suggestedMax: totalEntries,
        },
      },
      maintainAspectRatio: false,
    };

    const pieChartDataObj = {
      labels: labels,
      datasets: [
        {
          data: [currentlyEngaging, completed, dropped, onHold, planTo],
          backgroundColor: [
            "rgba(0, 0, 255, 0.2)",
            "rgba(8, 255, 8, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(255, 165, 0, 0.2)",
            "rgba(128, 128, 128, 0.2)",
          ],
          borderColor: [
            "rgb(0, 0, 255)",
            "rgb(8, 255, 8)",
            "rgb(255, 0, 0)",
            "rgb(255, 165, 0)",
            "rgb(128, 128, 128)",
          ],
          borderWidth: 1,
          barPercentage: 0.5,
        },
      ],
    };

    const pieChartOptionsObj = {
      plugins: {
        legend: {
          position: "left" as const,
        },
      },
      scales: {
        y: {
          display: false,
        },
      },
      maintainAspectRatio: false,
    };

    setBarChartData(barChartDataObj);
    setBarChartOptions(barChartOptionsObj);
    setPieChartData(pieChartDataObj);
    setChartPieOptions(pieChartOptionsObj);
  }, [
    totalEntries,
    currentlyEngaging,
    completed,
    dropped,
    onHold,
    planTo,
    labels,
  ]);

  return (
    <div className="chart-container">
      {chartType === "pie" && (
        <Pie data={pieChartData} options={pieChartOptions} />
      )}
      {chartType === "bar" && (
        <Bar data={barChartData} options={barchartOptions} />
      )}
    </div>
  );
};
export default ChartDisplay;
