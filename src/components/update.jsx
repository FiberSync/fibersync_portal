import React, { useState } from 'react';
import MetamaskLogo from './metamaskLogo';
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { Bs3CircleFill } from "react-icons/bs";
import Web3 from 'web3';
import contractAPI from '../assets/loginContract';
import Swal from 'sweetalert2';

const web3 = new Web3(window.ethereum);
const contractABI = contractAPI;
const contractAddress = "0x88eEb248d6f189caE55a2a5Ffd32D953C0a7fE37";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const Update = () => {
  const [userAddress, setUserAddress] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isWhitelisted, setIsWhitelisted] = useState(false);

  const getUserDetails = async () => {
    try {
      const user = await contract.methods.getUser(userAddress).call();
      if (!user.isWhite) {
        Swal.fire({
          title: "Oops",
          html: "You are not whitelisted to update.",
          icon: "error"
        });
        return;
      }
      setName(user.name);
      setRole(user.role);
      setCompanyName(user.companyName);
      setIsWhitelisted(user.isWhite);
    } catch (error) {
      console.error("Error fetching user details:", error);
      Swal.fire({
        title: "Oops",
        html: "User not found or incorrect address.",
        icon: "error"
      });
    }
  };

  const updateUser = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const currentUser = accounts[0];
      const isWhitelisted = await contract.methods.isWhitelisted(currentUser).call();

      if (!isWhitelisted) {
        Swal.fire({
          title: "Oops",
          html: "You are not whitelisted to update.",
          icon: "error"
        });
        return;
      }

      // Update user details
      await contract.methods.updateUser(name, role, companyName).send({ from: currentUser });

      Swal.fire({
        title: "Success!",
        html: `<b>${name}</b>, <b>${role}</b>, and <b>${companyName}</b> have been updated!`,
        icon: "success"
      });
    } catch (error) {
      console.error("Error while updating user:", error);
      Swal.fire({
        title: "Oops",
        html: "Something went wrong while updating.",
        icon: "error"
      });
    }
  };

  const removeWhitelist = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const owner = accounts[0];

      // Check if the current user is the owner
      const isOwner = owner === await contract.methods.owner().call();
      if (!isOwner) {
        Swal.fire({
          title: "Oops",
          html: "Only the owner can remove whitelist status.",
          icon: "error"
        });
        return;
      }

      // Call the function to remove whitelist status
      await contract.methods.setWhitelistStatus(userAddress, false).send({ from: owner });

      Swal.fire({
        title: "Done!",
        html: `<b>${userAddress}</b> has been removed from the whitelist!`,
        icon: "success"
      });
    } catch (error) {
      console.error("Error while removing whitelist:", error);
      Swal.fire({
        title: "Oops",
        html: "Error while removing whitelist status.",
        icon: "error"
      });
    }
  };

  return (
    <>
      <div className='font-raleway'>
        <h1 className='font-poppins font-bold text-2xl text-black text-left mb-4'>
          <Bs1CircleFill className='inline-block align-middle mr-2' /> Update User Info
        </h1>
        <p className="mb-4 font-medium text-sm text-gray-600 text-left">
          Enter the organization's wallet address to update details or remove whitelist status.
        </p>
        <div className='flex flex-col items-start justify-center p-10 border border-gray-400 rounded-lg bg-[#ffffffda]'>
          <h2 className='font-poppins font-bold text-xl text-[#41c02a] text-left mb-4'>Get User Details</h2>
          <input
            className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
            type="text"
            placeholder="Enter Wallet Address"
            onChange={(e) => setUserAddress(e.target.value)}
          />
          <button
            type="button"
            onClick={getUserDetails}
            className="text-gray-900 mt-4 font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
          >
            <MetamaskLogo />
            Fetch User Details
          </button>
        </div>

        {userAddress && (
          <>
            <h1 className='font-poppins font-bold text-2xl mt-6 text-black text-left mb-4'>
              <Bs2CircleFill className='inline-block align-middle mr-2' /> Update Company Details
            </h1>
            <div className='flex flex-col items-start justify-center p-10 border border-gray-400 rounded-lg bg-[#ffffffda]'>
              <h2 className='font-poppins font-bold text-xl text-[#41c02a] text-left mb-4'>Update Company's Details</h2>
              <input
                className="w-full mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Organization Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                className="w-full mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Admin Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <button
                type="button"
                onClick={updateUser}
                className="text-gray-900 mt-4 font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
              >
                <MetamaskLogo />
                Update Company Details
              </button>
            </div>

            <h1 className='font-poppins font-bold text-2xl mt-6 text-black text-left mb-4'>
              <Bs3CircleFill className='inline-block align-middle mr-2' /> Remove Access Status
            </h1>

            {isWhitelisted && (
              <button
                type="button"
                onClick={removeWhitelist}
                className="text-gray-900 mt-4 font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
              >
                Remove from Whitelist
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Update;
