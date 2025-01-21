import React from "react";
import { FaShoppingCart, FaMoneyBillWave, FaChartLine, FaTags } from "react-icons/fa";

const DashboardInfoRow = () => {
  const cardData = [
    {
      id: 1,
      icon: <FaTags />,
      title: "Orders",
      value: "1,587",
      change: "+11%",
      changeColor: "bg-green-500",
      description: "From previous period",
    },
    {
      id: 2,
      icon: <FaMoneyBillWave />,
      title: "Revenue",
      value: "$46,782",
      change: "-29%",
      changeColor: "bg-red-500",
      description: "From previous period",
    },
    {
      id: 3,
      icon: <FaChartLine />,
      title: "Avg Raw Material Cost",
      value: "$15.9",
      change: "0%",
      changeColor: "bg-yellow-500",
      description: "From previous period",
    },
    {
      id: 4,
      icon: <FaShoppingCart />,
      title: "Finished Product",
      value: "1,890",
      change: "+89%",
      changeColor: "bg-green-500",
      description: "Per Week",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {cardData.map((card) => (
        <div
          key={card.id}
          className="p-5 bg-slate-100 border border-slate-400 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="text-3xl text-[#39ff14]">{card.icon}</div>
          </div>
          <h6 className="text-blue-950 text-sm uppercase mt-4">{card.title}</h6>
          <h3 className="jos text-2xl font-bold text-blue-950 mb-3" data-jos_animation="fade">{card.value}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center py-0.5 px-1.5 text-xs font-medium text-blue-950 rounded ${card.changeColor}`}
            >
              {card.change}
            </span>
            <span className="text-blue-950">{card.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardInfoRow;
