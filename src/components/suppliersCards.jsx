import React from "react";
import ContactCard from "./contactCards";
import { CiViewTable,CiPhone } from "react-icons/ci";

const suppliers = [
  {
    name: "Donald Gonzalez",
    location: "New York, USA",
    phone: "+1 234 567 890",
    description: "Supplier of premium cotton fabrics.",
    image: "https://thumbs.dreamstime.com/b/generative-ai-young-smiling-man-avatar-man-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-d-vector-people-279560903.jpg",
  },
  {
    name: "Sophia Taylor",
    location: "Los Angeles, USA",
    phone: "+1 987 654 321",
    description: "Specializes in sustainable textiles.",
    image: "https://img.freepik.com/free-photo/portrait-businesswoman-isolated-home_23-2148813223.jpg",
  },
  {
    name: "Liam Smith",
    location: "Karachi, Pakistan",
    phone: "+92 300 123 4567",
    description: "Leading exporter of polyester blends.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbiUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const SupplierList = () => (
  <>
    <h1 className='font-poppins font-bold  text-2xl  text-black text-left mb-4'>
    <CiPhone className='inline-block align-middle mr-2'  /> Contact List
    </h1>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {suppliers.map((supplier, index) => (
      <ContactCard key={index} {...supplier} />
    ))}
  </div>
  </>
);

export default SupplierList;
