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

function App(){
  let { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Checking Auth");
    dispatch(checkAuth());
  }, [dispatch]);

  console.log(user,isLoading,isAuthenticated)
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
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
