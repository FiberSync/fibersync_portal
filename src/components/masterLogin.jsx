import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MasterLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login API with username and password
      const response = await axios.post('https://fiber-sync.vercel.app/login', {
        email: username,
        password: password,
      });

      // Check if login is valid
      if (response.data.message === 'Valid') {
        sessionStorage.setItem('auth', 'valid');
        // Redirect to another page (dashboard, home, etc.)
        navigate('/masteradmin/add'); // You can change the route here
      } else {
        // Show invalid credentials message
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Show error message if the API request fails
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='bg-white md:grid md:items-center md:justify-stretch md:mt-8 md:ml-[13rem] max-w-[1250px] h-[90vh] border rounded-lg'>
      <div className="max-w-screen-xl h-[85vh] sm:mb-5 sm:mt-4 sm:mx-7 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div className="w-full bg-cover bg-center bg-no-repeat rounded-lg"
          style={{
            backgroundImage:
              "url('https://study.com/cimages/course-image/introduction-to-textiles-the-textile-industry_332107_large.jpeg')",
          }}
          ></div>
        </div>
        <div className="jos lg:w-1/2 xl:w-5/12 p-6 sm:p-12" data-jos_animation="zoom" data-jos_once="false">
          <div>
            <p className='jos font-poppins font-bold text-5xl text-colorGreen'>
              FiberSync
            </p>
          </div>
          <div className="mt-12 flex flex-col items-center font-spaceGrotesk">
            <form onSubmit={handleLogin} className="w-full">
              <div className="w-full flex-1 mt-8">
                <input
                  className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className='h-5'></div>
                <input
                  className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-black md:w-64 md:h-22 hover:text-gray-900 bg-[#6eff8e] hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-4 text-center inline-flex items-center me-2 mb-2 mt-3 font-poppins"
                >
                  <LogIn color='#000' className='ml-3 mr-5 font-bold' />
                  Login
                </button>
              </div>
            </form>
            <div className="my-4 border-b text-center">
              <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                Or Ask for Support Through Email
              </div>
            </div>
            <p className="mt-6 text-xs text-gray-600 text-center">
              I agree to abide by FiberSync's{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Terms of Service
              </a>{" "}
              and its{" "}
              <a href="#" className="border-b border-gray-500 border-dotted">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterLogin;
