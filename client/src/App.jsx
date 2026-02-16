import { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "./ScrollToTop";

import { checkAuth } from "./store/auth-slice";
import CheckAuth from "./components/common/CheckAuth";

/* layouts */
import AuthLayout from "./components/auth/AuthLayout";
import AdminLayout from "./components/admin-view/AdminLayout";
import UserLayout from "./components/user-view/UserLayout";
import ProviderLayout from "./components/provider-view/ProviderLayout";
import PublicLayout from "./components/public-view/PublicLayout";

/* pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/admin-view/Dashboard";
import AdminProvider from "./pages/admin-view/AdminProvider";

import Home from "./pages/user-view/Home";
import About from "./pages/user-view/About";
import ContactUs from "./pages/user-view/ContactUs";
import Services from "./pages/user-view/Services";
import ServiceDetail from "./components/user-view/Services-page/ServiceDetail";
import UserAccount from "./pages/user-view/UserAccount";

import AddService from "./pages/provider-view/AddService";
import Account from "./pages/provider-view/Account";
import ProviderDashboard from "./pages/provider-view/PorviderDashboard";

import NotFound from "./NotFound";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  const router = createBrowserRouter([
    /* ---------- PUBLIC ROUTES ---------- */
    {
      path: "/",
      element: (
        <>
          <ScrollToTop />
          <PublicLayout />
        </>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "contact", element: <ContactUs /> },
        { path: "services", element: <Services /> },
      ],
    },

    /* ---------- AUTH ROUTES ---------- */
    {
      path: "/auth",
      element: (
        <CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <AuthLayout />
        </CheckAuth>
      ),
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    /* ---------- ADMIN ROUTES ---------- */
    {
      path: "/admin",
      element: (
        <CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <AdminLayout />
        </CheckAuth>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "providers", element: <AdminProvider /> },
      ],
    },

    /* ---------- USER ROUTES ---------- */
    {
      path: "/user",
      element: (
        <CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <UserLayout />
        </CheckAuth>
      ),
      children: [
        { path: "account", element: <UserAccount /> },
        {path:'serviceDetail/:serviceId',element:<ServiceDetail/>}
      ],
    },

    /* ---------- PROVIDER ROUTES ---------- */
    {
      path: "/service-provider",
      element: (
        <CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <ProviderLayout />
        </CheckAuth>
      ),
      children: [
        { path: "dashboard", element: <ProviderDashboard /> },
        { path: "add-service", element: <AddService /> },
        { path: "account/:id", element: <Account /> },
      ],
    },

    /* ---------- 404 ---------- */
    {
      path: "*",
      element: (
        <CheckAuth user={user} isAuthenticated={isAuthenticated}>
          <NotFound />
        </CheckAuth>
      ),
    },
  ]);

  return (
    <div className="w-full h-screen">
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
