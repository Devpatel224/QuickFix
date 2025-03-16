import React, { Children } from 'react'
import { Navigate , useLocation } from 'react-router-dom'

function CheckAuth({isAuthenticated,user,children}) {
  const location = useLocation()

  if (!isAuthenticated && location.pathname === "/") {
   return <Navigate to="/auth/login" />;
 }
 
  if(!isAuthenticated && !( location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
     return(
        <Navigate to='/auth/login'></Navigate>
     )
  } 


  if(isAuthenticated && ( location.pathname.includes('/auth/login') || location.pathname.includes('/auth/register'))){
     if(user?.role === 'admin'){
        return <Navigate to='/admin'></Navigate>
     }
     else if(user?.role === 'user'){
        return <Navigate to='/user'></Navigate>
     } 
     else{
        return <Navigate to='/service-provider'></Navigate>
     }
    }
    

   if(isAuthenticated &&  user?.role == "admin" && (location.pathname.includes('/user') || location.pathname.includes('/service-provider'))){
      return <Navigate to='/admin'></Navigate>
    }

   if(isAuthenticated && user?.role == "provider" && (location.pathname.includes('/admin') || location.pathname.includes('/user'))){
      return <Navigate to='/service-provider'></Navigate>
    }

    if(isAuthenticated && user?.role == 'user' && (location.pathname.includes("/admin") || location.pathname.includes("/service-provider"))){
      return <Navigate to='/user'></Navigate>
    }    


  return (
     <>
    {children}
     </>
  )
}

export default CheckAuth