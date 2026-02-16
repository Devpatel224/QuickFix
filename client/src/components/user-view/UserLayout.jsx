import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
    <UserHeader />
     <div>
      <Outlet />  
    </div>   
  </div>
  )
}

export default UserLayout