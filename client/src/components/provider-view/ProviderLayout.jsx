import React , {useEffect, useState} from 'react'
import ProviderHeader from './ProviderHeader'
import ProviderSidebar from './ProviderSidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getServices } from '@/store/provider-slice'
import { useSelector } from 'react-redux'

function ProviderLayout() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  

  return (
   <div className='w-full min-h-screen flex'> 
    <ProviderSidebar isOpenSidebar={isOpenSidebar} setIsOpenSidebar={setIsOpenSidebar}></ProviderSidebar>

    <div className='w-full flex flex-col'> 
    <ProviderHeader setIsOpenSidebar={setIsOpenSidebar}/>
    <Outlet />
   </div>
   </div>
  )
}

export default ProviderLayout