import React, { useState } from 'react';
import Web3 from 'web3';
import contractAPI from '../assets/loginContract';
import Swal from 'sweetalert2';
import { Bs1CircleFill } from "react-icons/bs";

const web3 = new Web3(window.ethereum);
const contractABI = contractAPI;
const contractAddress = "0x88eEb248d6f189caE55a2a5Ffd32D953C0a7fE37";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const List = () => {
  const [users, setUsers] = useState([]); // State to hold user data

  const getAllUsers = async () => {
    try {
      const whitelistedAddresses = await contract.methods.getAllWhitelisted().call();
  
      if (whitelistedAddresses.length === 0) {
        console.log("No whitelisted users found.");
        Swal.fire('No users found!', '', 'info');
        return;
      }
  
      const userDetails = [];
  
      for (const address of whitelistedAddresses) {
        const user = await contract.methods.getUser(address).call();
  
        // Check if the address already exists in userDetails
        if (!userDetails.some(existingUser => existingUser.address === address)) {
          userDetails.push({
            address,
            name: user.name,
            role: user.role,
            companyName: user.companyName,
            isWhite: user.isWhite,
          });
        }
      }
  
      setUsers(userDetails); // Update state with filtered data
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire('Error fetching users', error.message, 'error');
    }
  };
  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className='font-poppins font-bold  text-2xl  text-black text-left mb-4'>
    <Bs1CircleFill className='inline-block align-middle mr-2'  /> List all the Users
    </h1>
    <p className="mb-4 font-medium text-sm text-gray-600 text-left">
           Check the details of Current Users and Whitelisted Addresses
    </p>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Company</th>
              <th scope="col" className="px-6 py-3">Whitelisted</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4">{user.companyName}</td>
                  <td className="px-6 py-4">{user.isWhite ? "Yes" : "No"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  No users available. Click "Fetch Users" to load data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={getAllUsers}
        className="text-gray-900 mt-4 font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
      >
        Fetch Users
      </button>
    </>
  );
};

export default List;
