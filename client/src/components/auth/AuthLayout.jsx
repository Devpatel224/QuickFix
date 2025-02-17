import React from 'react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/button'


function AuthLayout() {
  return (
    <div className='w-full h-screen p-0 m-0'>      
        <Outlet />
    </div>
  )
}

export default AuthLayout