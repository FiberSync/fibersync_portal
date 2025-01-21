import React from "react";
import { Download } from "lucide-react";

const tableData = [
  {
    title: "Production Status",
    rows: [
      { label: "Raw Material Sourcing", value: "12,000 kg", progress: 75 },
      { label: "Weaving", value: "8,500 meters", progress: 50 },
      { label: "Dyeing", value: "4,200 meters", progress: 65 },
    ],
  },
  {
    title: "Inventory Levels",
    rows: [
      { label: "Cotton", value: "18,000 kg", progress: 90 },
      { label: "Dye", value: "5,000 liters", progress: 30 },
      { label: "Thread", value: "7,500 spools", progress: 60 },
    ],
  },
  {
    title: "Shipment Tracking",
    rows: [
      { label: "Order #123", value: "Dispatched", progress: 80 },
      { label: "Order #124", value: "In Transit", progress: 60 },
      { label: "Order #125", value: "Delivered", progress: 100 },
    ],
  },
];

const ProgressBar = ({ progress }) => (
  <div className="flex w-full h-[3px] bg-light rounded-full overflow-hidden">
    <div
      className="flex flex-col justify-center bg-colorGreen"
      style={{ width: `${progress}%` }}
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  </div>
);

const TableCard = ({ title, rows }) => (
    <div
      className="w-full md:w-1/3 border border-gray-300 rounded-lg shadow-md bg-white"
      style={{ overflow: "hidden" }}
    >
      {/* Card Header */}
      <div
        className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-300"
        style={{ backgroundColor: "#f9fafb" }}
      >
        <h4 className="text-lg font-medium text-slate-800">{title}</h4>
        <button
          className="flex items-center px-2 py-1 text-sm font-semibold bg-slate-100 text-gray-800 rounded-md border border-gray-300 hover:bg-gray-200"
          style={{ gap: "4px" }}
        >
          Export <Download className="w-4 h-4" />
        </button>
      </div>
  
      {/* Table */}
      <div>
        <table className="w-full table-auto border-collapse">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">
                Label
              </th>
              <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">
                Value
              </th>
              <th className="border-b border-gray-300 p-3 text-left text-sm font-semibold text-gray-700">
                Progress
              </th>
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="border-b border-gray-300 p-3 text-gray-800 text-sm">
                  {row.label}
                </td>
                <td className="border-b border-gray-300 p-3 text-gray-800 text-sm">
                  {row.value}
                </td>
                <td className="border-b border-gray-300 p-3">
                  <ProgressBar progress={row.progress} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
const DashboardTable = () => (
  <div className="flex flex-wrap gap-2 justify-start">
    {tableData.map((table, index) => (
      <TableCard key={index} title={table.title} rows={table.rows} />
    ))}
  </div>
);

export default DashboardTable;
