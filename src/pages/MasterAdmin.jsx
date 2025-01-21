import React from "react";
import CustomSidebar from "../components/sidebar";
import AdminSidebar from "../components/masterSideBar";


const MasterAdmin = () => {
  return (

      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Welcome to the FiberSync  </h1>
        <p className="mt-4 text-gray-600">
          This is the main content area. Click on the sidebar items for different interactions.
        </p>
      </main>

  );
};

export default MasterAdmin;
