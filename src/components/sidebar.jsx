import React, { useState } from "react";
import { Sidebar, Menu, MenuItem ,SubMenu,} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBookOpen,
  FiCalendar,
  FiShoppingCart,
  FiMenu,
} from "react-icons/fi";
import { GiGearHammer } from "react-icons/gi";
import { LuWarehouse } from "react-icons/lu";
import { RiDashboard2Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { Car,Boxes,NotepadText } from "lucide-react";



const CustomSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{backgroundColor:"rgb(31, 41, 55)"}}>
    <Sidebar
      collapsed={collapsed}
      transitionDuration={400}
      width="18rem" 
      backgroundColor="rgb(31, 41, 55)"
      rootStyles={{
        color: "white",
        height: "100vh",
        fontFamily: "Raleway, sans-serif",
        backgroundColor:"rgb(31, 41, 55)"
      }}
    >
      <div className="flex items-center justify-between p-4 bg-gray-900">
        <h1 className={`text-colorGreen font-poppins text-lg font-bold ${collapsed && "hidden"}`}>
          FiberSync
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white text-2xl"
        >
         {collapsed? <FiMenu />:<ImCross />}
        </button>
        
      </div>

      <Menu
        menuItemStyles={{
          button: {
            backgroundColor:"rgb(31, 41, 55)",
            [`&.active`]: {
              backgroundColor: "#1f2937", // Tailwind's bg-gray-700
              color: "#22d3ee", // Tailwind's text-cyan-400
            },
            [`&:hover`]: {
                backgroundColor: '#39ff14', // Tailwind's cyan-400
                color: 'black',
                animation: `${collapsed? "shake 0.5s ease":""}`,
              },
          },
        }}
      >


        <MenuItem icon={<RiDashboard2Line size={collapsed? 33:20} />} component={<Link to="/index" />}>
          Dashboard
        </MenuItem>
        <SubMenu defaultOpen={true} rootStyles={{ button: { backgroundColor:"rgb(31, 41, 55)"} }} label="Supplier Management" icon={<Boxes size={collapsed? 33:20} />}>
          <MenuItem  component={<Link to="/inventory/overview" />}>
            Procurement
          </MenuItem>
          <MenuItem  component={<Link to="/index/supplier/Details" />}>
            Supplier Details
          </MenuItem>
        </SubMenu>
        <SubMenu defaultOpen={true} rootStyles={{ button: { backgroundColor:"rgb(31, 41, 55)"} }} label="Inventory Management" icon={<LuWarehouse size={collapsed? 33:20}/>}>
          <MenuItem  component={<Link to="/inventory/overview" />}>
            Overview
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/products" />}>
            Raw Materials
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/suppliers" />}>
            {collapsed ? "WIP" : "Work in Process"}
          </MenuItem>
        </SubMenu>
        <SubMenu defaultOpen={true} rootStyles={{ button: { backgroundColor:"rgb(31, 41, 55)"} }} label="Order Management" icon={<NotepadText size={collapsed? 33:20} />}>
          <MenuItem  component={<Link to="/inventory/overview" />}>
            Order Generation
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/products" />}>
            Order Details
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/suppliers" />}>
            Order Analysis
          </MenuItem>
        </SubMenu>
        <SubMenu defaultOpen={true} rootStyles={{ button: { backgroundColor:"rgb(31, 41, 55)"} }} label="Production Management" icon={<GiGearHammer size={collapsed? 33:20} />}>
          <MenuItem  component={<Link to="/inventory/overview" />}>
            Spining
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/products" />}>
            Weaving 
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/suppliers" />}>
            Deying
          </MenuItem>
          <MenuItem  component={<Link to="/inventory/suppliers" />}>
            Manufacturing 
          </MenuItem>
        </SubMenu>
        <MenuItem icon={<Car size={collapsed? 33:20}/>} component={<Link to="/e-commerce" />}>
          Logistics
        </MenuItem>
        <MenuItem icon={<FiShoppingCart size={collapsed? 33:20}/>} component={<Link to="/e-commerce" />}>
          Finished Goods
        </MenuItem>
     
        <MenuItem icon={<GiGearHammer size={collapsed? 33:20}/>} component={<a href="https://syncbot.streamlit.app/" ></a>}>
          AI Tools
        </MenuItem>
        <h1 className={`text-colorGreen font-poppins text-lg font-bold ${!collapsed && "hidden"}`}>
          FS
        </h1>
      </Menu>
    </Sidebar>
    </div>
  );
};

export default CustomSidebar;
