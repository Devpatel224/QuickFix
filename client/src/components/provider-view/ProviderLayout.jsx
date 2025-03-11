import React , {useState} from 'react'
import ProviderHeader from './ProviderHeader'
import ProviderSidebar from './ProviderSidebar'
import { Outlet } from 'react-router-dom'


function ProviderLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  
  return (
   <div className='w-full h-screen flex'> 
    <ProviderSidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}></ProviderSidebar>

    <div className='w-full flex flex-col'> 
    <ProviderHeader setIsOpenSidebar={setIsOpenSidebar}/>
    <Outlet />
   </div>
   </div>
  )
}

export default ProviderLayout