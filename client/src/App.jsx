import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin-view/Dashboard";
import UserLayout from "./components/user-view/UserLayout";
import ProviderLayout from "./components/provider-view/ProviderLayout";
import { Toaster } from "@/components/ui/toaster";
import CheckAuth from "./components/common/CheckAuth";
import AdminLayout from "./components/admin-view/AdminLayout";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import Home from "./pages/user-view/Home"
import ContactUs from "./pages/user-view/ContactUs";
import About from "@/pages/user-view/About"
import AddService from "./pages/provider-view/AddService";
import Account from "./pages/provider-view/Account";
import Services from "./pages/user-view/Services";
import ServiceDetail from "./components/user-view/Services-page/ServiceDetail";
import ProviderDashboard from "./pages/provider-view/PorviderDashboard";
import UserAccount from "./pages/user-view/UserAccount";

function App(){
  let { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 
  if(isLoading) return <div>Loading....</div>;

  return (
    <div className="w-full h-screen">
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={
              <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                <AuthLayout />
              </CheckAuth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route
            path="/admin"
            element={
              <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                <AdminLayout />
              </CheckAuth>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          <Route
            path="/user"
            element={
              <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                <UserLayout />
              </CheckAuth>
            }
          >
            <Route path="" element={<Home/>}></Route>
            <Route path="/user/contact" element={<ContactUs/>}></Route>
            <Route path="/user/about" element={<About/>}></Route>
            <Route path="/user/services" element={<Services/>} />
            <Route path="/user/serviceDetail/:serviceId" element={<ServiceDetail/>} />
            <Route path="account" element={<UserAccount/>} />
          </Route>

          <Route
            path="/service-provider"
            element={
              <CheckAuth user={user} isAuthenticated={isAuthenticated}>
                <ProviderLayout />
              </CheckAuth>
            }
          >
            {/* <Route path="dashboard" element={<Dashboard />} /> */}
            <Route path="add-service" element={<AddService/>} />
            <Route path="/service-provider/account/:id" element={<Account/>} />
            <Route path="dashboard" element={<ProviderDashboard/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;