import { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

import "./ChartDisplay.css";
const ChartDisplay = ({
  type,
  watching,
  completed,
  dropped,
  onHold,
  planToWatch,
  totalEntries,
}) => {
  const [barChartData, setBarChartData] = useState({
    labels: ["Watching", "Completed", "Dropped", "On Hold", "Plan to Watch"],
    datasets: [
      {
        label: `Total Entries: ${totalEntries}`,
        data: [watching, completed, dropped, onHold, planToWatch],
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
    labels: ["Watching", "Completed", "Dropped", "On Hold", "Plan to Watch"],
    datasets: [
      {
        data: [watching, completed, dropped, onHold, planToWatch],
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
        position: "left",
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
      labels: ["Watching", "Completed", "Dropped", "On Hold", "Plan to Watch"],
      datasets: [
        {
          label: `Total Entries: ${totalEntries}`,
          data: [watching, completed, dropped, onHold, planToWatch],
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
      labels: ["Watching", "Completed", "Dropped", "On Hold", "Plan to Watch"],
      datasets: [
        {
          data: [watching, completed, dropped, onHold, planToWatch],
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
          position: "left",
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
  }, [totalEntries, watching, completed, dropped, onHold, planToWatch]);

  return (
    <div className="chart-container">
      {type === "pie" && (
        <Chart type={type} data={pieChartData} options={pieChartOptions} />
      )}
      {type === "bar" && (
        <Chart type={type} data={barChartData} options={barchartOptions} />
      )}
    </div>
  );
};
export default ChartDisplay;
