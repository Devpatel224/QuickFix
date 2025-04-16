import { Outlet } from "react-router-dom"
import AdminHeader from "./AdminHeader"
import { useState } from "react"
import AdminSidebar from "./AdminSidebar"

function AdminLayout() {
   const [isOpenSidebar, setIsOpenSidebar] = useState(false)

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