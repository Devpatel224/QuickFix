import ServiceSidebar from '@/components/user-view/Services-page/ServiceSidebar'
import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import ServicesPanel from '@/components/user-view/Services-page/ServicesPanel'
import { useSearchParams } from 'react-router-dom'


function Services() {
    const [isOpen, setIsOpen] = useState(false)
    const [ searchParams , setSearchParams ]    = useSearchParams()
    const selectedCategory = searchParams.get("category")

    const handleOpen = ()=>{
        setIsOpen((prev) => !prev)
    }

    
  return (
    <>
        <div className='w-full min-h-screen flex relative p-x-10'>        
          <button onClick={handleOpen} className="lg:hidden block top-1 left-1 bg-white p-2 rounded-md text-blue-500 shadow-md">
            <Menu size={24} className=""/>
          </button>
            <ServiceSidebar isOpen={isOpen} setIsOpen={setIsOpen} searchParams={searchParams} setSearchParams={setSearchParams}/>

        <div className='p-3 w-full'>
          <ServicesPanel selectedCategory={selectedCategory}/>
     </div>  
    </div>
    </>
  )
}

export default Services