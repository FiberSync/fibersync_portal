import React, { useState } from 'react';
import Web3 from 'web3';
import contractAPI from '../assets/loginContract';
import Swal from 'sweetalert2';

const web3 = new Web3(window.ethereum);
const contractABI = contractAPI;
const contractAddress = "0x88eEb248d6f189caE55a2a5Ffd32D953C0a7fE37";
const contract = new web3.eth.Contract(contractABI, contractAddress);

const DeleteAddressPage = () => {
  const [addressToDelete, setAddressToDelete] = useState("");

  const handleDelete = async () => {
    if (!web3.utils.isAddress(addressToDelete)) {
      Swal.fire('Invalid Address', 'Please enter a valid Ethereum address.', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the user with address: ${addressToDelete}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const accounts = await web3.eth.requestAccounts(); // Get user's wallet address
          const sender = accounts[0]; // Use the first account as the sender
          
          await contract.methods.deleteUser(addressToDelete).send({ from: sender });

          Swal.fire('Deleted!', `Address ${addressToDelete} has been successfully deleted.`, 'success');
          setAddressToDelete(""); // Reset input field
        } catch (error) {
          console.error("Error deleting address:", error);
          Swal.fire('Error', 'Failed to delete the address. Please ensure you are authorized.', 'error');
        }
      }
    });
  };

  return (
    <div className='flex flex-col items-start justify-center p-10 border border-gray-400 rounded-lg bg-[#ffffffda]'>
      <h2 className="text-lg font-bold mb-4 text-colorGreen">Delete User Address</h2>
      <input
        type="text"
        value={addressToDelete}
        onChange={(e) => setAddressToDelete(e.target.value)}
        placeholder="Enter Ethereum Address"
        className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-600 placeholder-gray-500 text-sm focus:outline-none mb-6 focus:border-gray-400 focus:bg-white"
      />
      <button
        type="button"
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Delete Address
      </button>
    </div>
  );
};

export default DeleteAddressPage;
