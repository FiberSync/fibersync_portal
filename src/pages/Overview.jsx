import React from "react";
import CustomSidebar from "../components/sidebar";
import DashboardInfoRow from "../components/dashboard";
import DashboardTable from "../components/tableDashboard";
import { CiViewTable } from "react-icons/ci";
import SupplierList from "../components/suppliersCards";
import DashboardGreetingCard from "../components/greet";
import SupplierPerformanceChart from "../components/supplierBarChart";

const SCMOverview = () => {
  return (

      <main className="flex-1 p-6 bg-gray-100">
        <DashboardGreetingCard/>
        <h1 className='font-poppins font-bold  text-2xl  text-black text-left mb-4 mt-4'>
    <CiViewTable className='inline-block align-middle mr-2'  /> Value Cards
    </h1>
        <div className="jos mb-2 ">
        <DashboardInfoRow/>
        </div>
        <div className="bg-slate-100 border border-slate-300 rounded-lg shadow-md">
        <SupplierPerformanceChart/>
        </div>
       
        <h1 className='font-poppins font-bold  text-2xl  text-black text-left mt-2 mb-4'>
    <CiViewTable className='inline-block align-middle mr-2'  /> Progression Table
    </h1>
        <DashboardTable/>
      </main>

  );
};

export default SCMOverview;
