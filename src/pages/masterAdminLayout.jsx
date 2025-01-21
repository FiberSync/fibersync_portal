import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/masterSideBar';

const MasterAdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('auth');
    if (auth !== 'valid') {
      navigate('/0000Master0000');
    }
  }, [navigate]);

  return (
    <div className="flex h-auto w-screen font-raleway">
      <AdminSidebar /> {/* Sidebar */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet /> {/* This renders nested routes */}
      </main>
    </div>
  );
};

export default MasterAdminLayout;
