import React,{useState} from 'react'
import LoginScreen from './loginScreen'
import MetamaskLogo from './metamaskLogo'
import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import Web3 from 'web3';
import contractAPI from '../assets/loginContract';
import Swal from 'sweetalert2';

const web3 = new Web3(window.ethereum);
const contractABI = contractAPI;
const contractAddress = "0x88eEb248d6f189caE55a2a5Ffd32D953C0a7fE37";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const Add = () => {
   const [userAddress, setUserAddress] = useState('');
   const [name, setName] = useState('');
   const [role, setRole] = useState('');
   const [companyName, setCompanyName] = useState('');

   const whitelistUser = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const owner = accounts[0];
      console.log(owner);
      await contract.methods.setWhitelistStatus(userAddress, true).send({ from: owner });
      Swal.fire({
        title: "Done !",
        icon: "success",
        html: `<b>${userAddress}</b> Whitelisted Successfully ! <br/> <i>Now you can login through it.</i>`,
      });
    } catch (error) {
      console.error("Error whitelisting user:", error);
      Swal.fire({
        title: "Oops",
        html: "<i>Metamask Address Not Validated</i> <b>or</b> <i>Not Found !</i>",
        icon: "error"
      });
    }
  };

  const getAllUsers = async () => {
    try {
    //   Call the contract method to get all whitelisted addresses
      const whitelistedAddresses = await contract.methods.getAllWhitelisted().call();
  
      if (whitelistedAddresses.length === 0) {
        console.log("No whitelisted users found.");
        return;
      }
      console.log("Whitelisted Users:",whitelistedAddresses);
  
    //   Iterate over the list of whitelisted addresses and fetch user details
      for (let i = 0; i < 1; i++) {
        const address = whitelistedAddresses[i];
        const user = await contract.methods.getUser("0x6cc4Cf02381d5b58c032cae0E4bDa4556827BFA5").call();
  
        console.log(`User ${i + 1}:`);
        console.log(`Address: ${address}`);
        console.log(`Name: ${user.name}`);
        console.log(`Role: ${user.role}`);
        console.log(`Company Name: ${user.companyName}`);
        console.log(`Whitelisted: ${user.isWhite}`);
        console.log("---------------------------------");
      }
  
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const registerUser = async () => {
    try {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
      console.log(owner);
      // Check if the user is whitelisted
      const isWhitelisted = await contract.methods.isWhitelisted(owner).send({ from: owner });
      console.log(isWhitelisted)
      if (!isWhitelisted) {
        Swal.fire({
            title: "Oops",
            html: "<b>You must have Master Access to register !</b>",
            icon: "error"
          });
        return;
      }

      // Call the registerUser function
      await contract.methods.registerUser(name, role, companyName).send({ from: userAddress });
      Swal.fire({
        title: "Success",
        html: `<b>${name}</b>, <b>${role}</b> and <b>${companyName}</b> <br/> registered successfully!`,
        icon: "success"
      });
    } catch (error) {
      console.error("Error while registering user:", error);
      Swal.fire({
        title: "Oops",
        html: "<i>Metamask Address Not Validated</i> <b>or</b> <i>Not Found !</i>",
        icon: "error"
      });
    }
  };

  return (
    <>
    <div className='font-raleway'>
    <h1 className='font-poppins font-bold  text-2xl  text-black text-left mb-4'>
    <Bs1CircleFill className='inline-block align-middle mr-2'  /> Register Address
    </h1>
    <p className="mb-4 font-medium text-sm text-gray-600 text-left">
           Enter the organization's master wallet address to whitelist them. Only whitelisted addresses can be registered.
    </p>
    <div className='flex flex-col items-start justify-center p-10 border border-gray-400 rounded-lg bg-[#ffffffda]' >
    
    <h2 className='font-poppins font-bold text-xl text-[#41c02a] text-left mb-4'>Set Whitelist Status</h2>
    <input
    className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    type="text"
    placeholder="Organization's Master Wallet Address"
    onChange={(e)=>setUserAddress(e.target.value)}
    />
    <button type="button" onClick={()=>whitelistUser()} className="text-gray-900 mt-4  font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
    <MetamaskLogo/>
    Approve Whitelist Status
    </button>
    
    </div>
    <h1 className='font-poppins font-bold  text-2xl mt-6  text-black text-left mb-4'>
    <Bs2CircleFill className='inline-block align-middle mr-2'  /> Register Company
    </h1>
    <p className="mb-4 font-medium text-sm text-gray-600 text-left">
           Enter the organization's master wallet address to whitelist them. Only whitelisted addresses can be registered.
    </p>
    <div className='flex flex-col items-start justify-center p-10 border border-gray-400 rounded-lg bg-[#ffffffda]' >
    
    <h2 className='font-poppins font-bold text-xl text-[#41c02a] text-left mb-4'>Set Company's Details</h2>
    <input
    className="w-full mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    type="text"
    placeholder="Organization Name"
    onChange={(e)=>setCompanyName(e.target.value)}
    />
    <input
    className="w-full  mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    type="text"
    placeholder="Company SCM Admin Name"
    onChange={(e)=>setName(e.target.value)}
    />
    <input
    className="w-full  mt-2 px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
    type="text"
    placeholder="SCM Admin Role"
    onChange={(e)=>setRole(e.target.value)}
    />
    <button type="button" onClick={()=>registerUser()} className="text-gray-900 mt-4  font-poppins bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
    <MetamaskLogo/>
    Register Company
    </button>
    
    
    </div>


    </div>
    </>
  )
}

export default Add