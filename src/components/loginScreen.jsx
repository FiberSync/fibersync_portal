import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConnectIcon from "../assets/walletconnect-seeklogo.svg";
import { Headset } from "lucide-react";
import MetamaskLogo from "./metamaskLogo";
import Web3 from "web3";
import contractAPI from "../assets/loginContract";
import Swal from 'sweetalert2';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const CONTRACT_ADDRESS = "0x88eEb248d6f189caE55a2a5Ffd32D953C0a7fE37";
  const CONTRACT_ABI = contractAPI;

  const handleMetaMaskLogin = async () => {
    if (typeof window.ethereum === "undefined") {
      setErrorMessage("MetaMask is not installed. Please install it to proceed.");
      Swal.fire({
        icon:"error",
        title: "Error",
        text: "MetaMask is not installed. Please install it to proceed."
      }
      )
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const userAddress = accounts[0];

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const isWhitelisted = await contract.methods.isUserWhitelisted(userAddress).call();

      if (isWhitelisted) {
        sessionStorage.setItem("SCMAuthValid", "true");
        navigate("/index");
      } else {
        setErrorMessage("Your address is not whitelisted. Access denied.");
        Swal.fire({
          icon:"error",
          title: "Error",
          text: "Your address is not whitelisted. Access denied."
        }
        )
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred during login. Please try again.");
      Swal.fire({
        icon:"error",
        title: "Error",
        text: "An error occurred during login. Please try again."
      }
      )
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white md:grid md:items-center md:justify-stretch md:mt-8 md:ml-[13rem] max-w-[1250px] h-[90vh] border rounded-lg">
      <div className="max-w-screen-xl h-[85vh] sm:mb-5 sm:mt-4 sm:mx-7 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className=" w-full bg-cover bg-center bg-no-repeat rounded-lg"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/textile-fabrics-market_157027-4493.jpg')",
            }}
          ></div>
        </div>
        <div
          className="jos lg:w-1/2 xl:w-5/12 p-6 sm:p-12"
          data-jos_animation="zoom"
          data-jos_once="false"
        >
          <div>
            <p className="jos font-poppins font-bold text-5xl text-colorGreen">FiberSync</p>
          </div>
          <div className="mt-12 flex flex-col items-center font-spaceGrotesk">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={handleMetaMaskLogin}
                  className="text-white font-poppins md:w-64 md:h-22 hover:text-gray-900 bg-[#f88550] hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center  me-2 mb-2"
                >
                  <MetamaskLogo />
                  {loading ? "Connecting..." : "Connect with MetaMask"}
                </button>
              </div>

              <button
                type="button"
                className="text-white md:w-64 md:h-22 hover:text-gray-900 bg-[#52abdf] hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center  me-2 mb-2 font-poppins"
              >
                <img src={ConnectIcon} alt="Connect" className="w-12 h-12" />
                Connect with Wallet Connect
              </button>

              <div className="my-4 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or Ask for Support Through Email
                </div>
              </div>
              <input
                className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="email"
                placeholder="Email"
              />
              <div className="h-5"></div>
              <input
                className="w-full px-8 py-4 rounded-lg text-black font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                type="text"
                placeholder="Organization Name"
              />

              <button
                type="button"
                className="text-black md:w-64 md:h-22 hover:text-gray-900 bg-[#6eff8e] hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-2 py-4 text-center inline-flex items-center  me-2 mb-2 mt-3 font-poppins"
              >
                <Headset color="#000" className="ml-3 mr-5" />
                Get Guide / Help
              </button>

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
    </div>
  );
};

export default LoginScreen;
