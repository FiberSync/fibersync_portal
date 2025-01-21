import React, { useState } from "react";
import Chart from "react-apexcharts";

const SupplierPerformanceChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Orders Delivered",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "Orders Pending",
        data: [13, 23, 20, 8, 13, 27],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Supplier A", "Supplier B", "Supplier C", "Supplier D", "Supplier E", "Supplier F"],
      },
      yaxis: {
        title: {
          text: "Orders",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val) => `${val} Orders`,
        },
      },
    },
  });

  return (
    <div className="jos p-6 bg-white shadow-lg rounded-lg" data-jos_animation="fade-up">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Supplier Performance</h2>
      <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
    </div>
  );
};

export default SupplierPerformanceChart;
