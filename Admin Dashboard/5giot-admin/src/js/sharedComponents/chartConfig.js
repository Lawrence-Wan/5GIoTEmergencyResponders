var config = null;
const chartData = {
  datasets: [
    {
      fill: true,
      label: "Temperature",
      yAxisID: "Temperature",
      borderColor: "rgba(255, 204, 0, 1)",
      pointBoarderColor: "rgba(255, 204, 0, 1)",
      backgroundColor: "rgba(255, 204, 0, 0.4)",
      pointHoverBackgroundColor: "rgba(255, 204, 0, 1)",
      pointHoverBorderColor: "rgba(255, 204, 0, 1)",
      spanGaps: true,
    },
    {
      fill: true,
      label: "Humidity",
      yAxisID: "Humidity",
      borderColor: "rgba(24, 120, 240, 1)",
      pointBoarderColor: "rgba(24, 120, 240, 1)",
      backgroundColor: "rgba(24, 120, 240, 0.4)",
      pointHoverBackgroundColor: "rgba(24, 120, 240, 1)",
      pointHoverBorderColor: "rgba(24, 120, 240, 1)",
      spanGaps: true,
    },
  ],
};

const chartOptions = {
  scales: {
    yAxes: [
      {
        id: "Temperature",
        type: "linear",
        scaleLabel: {
          labelString: "Temperature (ºC)",
          display: true,
        },
        position: "left",
      },
      {
        id: "Humidity",
        type: "linear",
        scaleLabel: {
          labelString: "Humidity (%)",
          display: true,
        },
        position: "right",
      },
    ],
    tooltips: {
      mode: "index",
    },
    events: ["click"],
  },
};
export function chartConfig() {
  if (!config) {
    config = {
      type: "line",
      data: chartData,
      options: chartOptions,
    };
  }
  return config;
}
