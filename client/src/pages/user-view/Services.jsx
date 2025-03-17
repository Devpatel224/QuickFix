import ServiceSidebar from '@/components/user-view/Services-page/ServiceSidebar'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import ServicesPanel from '@/components/user-view/Services-page/ServicesPanel'


function Services() {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = ()=>{
        setIsOpen((prev) => !prev)
    }

  return (
    <>
        <div className='w-full min-h-screen flex relative p-x-10'>        
          <button onClick={handleOpen} className="lg:hidden block top-1 left-1 bg-white p-2 rounded-md text-blue-500 shadow-md">
            <Menu size={24} className=""/>
          </button>
            <ServiceSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>


        <div className='p-3 w-full'>
          <ServicesPanel />
     </div>  
    </div>
    </>
  )
}

export default Services