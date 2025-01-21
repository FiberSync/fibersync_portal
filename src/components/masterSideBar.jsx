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
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import { RiDashboard2Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import { GoPeople } from "react-icons/go";
import { FaRegAddressCard } from "react-icons/fa6";


const AdminSidebar = () => {
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
          ADMIN
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


        <MenuItem component={<Link to="add" />} icon={<FaRegAddressCard size={collapsed? 33:20} />} >
          Add Company
        </MenuItem>
        <MenuItem icon={<FaRegEdit  size={collapsed? 33:20}/>} component={<Link to="update" />} >
          Update Company 
        </MenuItem>
        <MenuItem icon={<MdDeleteForever size={collapsed? 33:20}/> } component={<Link to="delete" />}>
          Delete/Eliminate Subscription 
        </MenuItem>
        <MenuItem icon={<GoPeople size={collapsed? 33:20} />} component={<Link to="listUsers" />}>
          Get Users
        </MenuItem>
        <h1 className={`text-colorGreen font-poppins text-lg font-bold ${!collapsed && "hidden"}`}>
          FS
        </h1>
      </Menu>
    </Sidebar>
    </div>
  );
};

export default AdminSidebar;
