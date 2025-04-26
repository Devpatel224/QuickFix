import { Outlet, useLocation, useNavigate } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import { useState } from "react"
import AdminSidebar from "./AdminSidebar"

function AdminLayout() {
   const [isOpenSidebar, setIsOpenSidebar] = useState(false)
   let location = useLocation();
   let navigate = useNavigate();



   if(location.pathname === "/admin" || location.pathname === "/dashboard"){
      navigate("/admin/dashboard");
   }
   
  return (
    <div className="w-full min-h-screen flex">
        <AdminSidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}/>
        <div className="w-full  flex flex-col">
        <AdminHeader setIsOpenSidebar={setIsOpenSidebar}/>
          {<Outlet/>}
        </div>
    </div>
  )
}

export default AdminLayout