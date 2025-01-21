import React, { useState, useEffect } from "react";

const DashboardGreetingCard = () => {
  // State to track login status
  const isLoggedIn = sessionStorage.getItem("SCMAuthValid") === "true";

  // State to handle the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Effect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-black to-slate-950 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-2">
        Hello, {isLoggedIn ? "User!" : "Guest!"}
      </h2>
      <p className="text-sm mb-4">
        Welcome to <span className="text-colorGreen">FiberSync</span> SCM. Stay organized and efficient!
      </p>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-medium">
          Current Time: <span className="font-bold">{currentTime}</span>
        </span>
        {!isLoggedIn && (
          <button
            onClick={() => window.location.href = "/"} // Replace with your login route
            className="px-4 py-2 bg-white text-slate-900 font-bold rounded-lg shadow hover:bg-indigo-100"
          >
            Login
          </button>
        )}
      </div>

      {isLoggedIn ? (
        <div className="grid grid-cols-2 gap-4">
          <a
            href="/inventory"
            className="block p-3 bg-white text-slate-900 font-bold text-center rounded-lg shadow hover:bg-indigo-100"
          >
            Inventory
          </a>
          <a
            href="/orders"
            className="block p-3 bg-white text-slate-900 font-bold text-center rounded-lg shadow hover:bg-indigo-100"
          >
            Orders
          </a>
          <a
            href="/suppliers"
            className="block p-3 bg-white text-slate-900 font-bold text-center rounded-lg shadow hover:bg-indigo-100"
          >
            Suppliers
          </a>
          <a
            href="/analytics"
            className="block p-3 bg-white text-slate-900 font-bold text-center rounded-lg shadow hover:bg-indigo-100"
          >
            Analytics
          </a>
        </div>
      ) : (
        <p className="text-sm italic mt-4">
          Please log in to access your dashboard.
        </p>
      )}
    </div>
  );
};

export default DashboardGreetingCard;
