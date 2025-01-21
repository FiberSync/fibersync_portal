import React,{ useState } from 'react'
import './App.css'
import useJOSAnimation from "./custom_hooks/useJosAnimation";
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/login';
import SCMOverview from './pages/Overview';
import MasterAdmin from './pages/MasterAdmin';
import MasterAdminLayout from './pages/masterAdminLayout';
import Add from './components/add';
import List from './components/list';
import Update from './components/update';
import { MasterLoginPage } from './pages/masterLogin';
import DeleteAddressPage from './components/deleteUser';
import SCMLayout from './pages/scmLayout';
import SupplierList from './components/suppliersCards';


function App() {
  useJOSAnimation();

  return (
    <div>
      <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/index' element={<SCMLayout />}>
      <Route index element={<SCMOverview />} />
      <Route path="supplier/Details" element={<SupplierList />} />
      </Route>
      <Route path="/masteradmin" element={<MasterAdminLayout />}>
      <Route index element={<MasterAdmin />} />
      <Route path="add" element={<Add />} />
      <Route path="listUsers" element={<List />} />
      <Route path="update" element={<Update />} />
      <Route path="delete" element={<DeleteAddressPage />} />
    </Route>
    <Route path="/0000Master0000" element={<MasterLoginPage />} />
      </Routes>
    </div>
  )
}

export default App
