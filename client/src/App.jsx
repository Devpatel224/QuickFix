import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {
 

  return (
 
    <div className='w-full h-screen'>
      <Router>
        <Routes>
          <Route path='/auth' element={<AuthLayout/>}>
              <Route path='login' element={<Login/>}/>
              <Route path='register' element={<Register/>}/>
          </Route>
        </Routes>
      </Router>
      </div>
  )
}

export default App
