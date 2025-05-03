import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "@/store/user-slice";




function ServiceSidebar({ isOpen , setIsOpen ,  setSearchParams , searchParams}) {
  const {services} = useSelector((state)=>state.userView)
  const dispatch = useDispatch();

  

  // let categories = [...new Set(services.map((service) => service.servicename))];
  let seen = new Set();
  let categories = [];

for (let service of services) {
  let name = service.servicename?.trim();
  if (name && !seen.has(name.toLowerCase())) {
    seen.add(name.toLowerCase());
    categories.push(name); 
  }
}

  let currCategory = searchParams.get("category");
  if(searchParams){
     categories = ["All services", ...categories]    
  }

  const handleSelectCategory = (category)=>{
    if(category === "All services"){
      setSearchParams({});
    }else{
      setSearchParams({category})
    }
  }
  
  useEffect(()=>{
    dispatch(getAllServices())
  },[dispatch])

  return (
    <>       
      <aside className="hidden lg:flex w-60 bg-blue-200 min-h-screen shadow-lg p-4 flex-col gap-6">
        <h1 className="text-2xl font-extrabold font-mono text-center">Category</h1>
        <div className="flex flex-col gap-3">
          {categories.map((category, index) => (
            <motion.h3
              key={index}
              className={`px-4 py-2 rounded-md cursor-pointer text-lg font-semibold transition-all  ${ currCategory === category || (category === "All services" && !currCategory)  ? "bg-blue-400 text-white" : "bg-blue-100 hover:bg-blue-300" }`}          
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>handleSelectCategory(category)}
            >
              {category}
            </motion.h3>
          ))}
        </div>
      </aside>

      
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        
        <SheetContent side="left" className="w-50 bg-blue-200 p-4 flex flex-col gap-6">
          <h1 className="text-2xl font-extrabold font-mono text-center">Category</h1>
          {/* <div className="flex flex-col gap-3">
            {services.map((service, index) => (
              <motion.h3
                key={index}
                className="px-4 py-2 rounded-md cursor-pointer text-lg font-semibold bg-blue-100 hover:bg-blue-300 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {service.name}
              </motion.h3>
            ))}
          </div> */}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ServiceSidebar;  