import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/admin-view/Dashboard'
import UserLayout from './components/user-view/UserLayout'
import ProviderLayout from './components/provider-view/ProviderLayout'
import { Toaster } from "@/components/ui/toaster"
import CheckAuth from './components/common/CheckAuth'
import AdminLayout from './components/admin-view/AdminLayout'

function App() {
  
  let user = {
    role : "provider"
  }

  let isAuthenticated = true;

  return (
 
    <div className='w-full h-screen'>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>

          <Route path='/auth' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}><AuthLayout/></CheckAuth>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
          </Route>

          <Route path='/admin' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}><AdminLayout/> </CheckAuth>}>
              <Route path='dashboard' element={<Dashboard/>}/>
              
          </Route>

          <Route path='/user' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}><UserLayout/> </CheckAuth>}>
              
          </Route>

          <Route path='/service-provider' element={<CheckAuth user={user} isAuthenticated={isAuthenticated}><ProviderLayout/> </CheckAuth>}>
              
          </Route>

        </Routes>
      </Router>
      </div>
  )
}

export default App
