import React, { useState, useEffect , useRef } from "react";
import { Sheet, SheetTrigger } from "../ui/sheet";
import { DropdownMenu } from "../ui/dropdown-menu";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { Avatar } from "../ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


const NavMenus = [
  {label:"Home" , path:"/user" ,},
  {label:"Services" , path:"services"},
  {label:"About" , path:"about"},
  {label:"Contact" , path:"contact"},
]

function UserHeader() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const {toast} = useToast()
  const navigate = useNavigate()
  const [isHoveredIndex,setIsHoveredIndex] = useState(null)
  const [isMenuItemsOpen,setIsMenuItemsOpen] = useState(false)
 
  const sidebarRef = useRef();
  const tl = useRef();
  
  
  
  const handleLogOut = ()=>{
    dispatch(logoutUser()).then((data)=>{
      if(data?.payload?.success){
        toast({
          title: "Logout SuccessFully"
        })
        navigate("/auth/login")
      }
      else{
        toast({
          title: data?.payload?.message || "An error occurred",
          variant: 'destructive',
        });
      }
    })
  }
  

  
  useGSAP(()=>{
     tl.current = gsap.timeline({paused:true}) 
      .fromTo(sidebarRef.current,{
        x:'-100%',
        opacity:0
      },
      {
        x:"0%",
        opacity:1,
        duration:0.5
      }   
    ).reverse();
    
   })

  useEffect(() => {
    if (isMenuItemsOpen) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [isMenuItemsOpen]);
 


  return (
    <div>
      <nav className="bg-blue-50 py-4 px-2 text-blue-500 shadow-md flex justify-center items-center">
        
        <div className="container flex justify-between items-center">   

          <div ref={sidebarRef} className="fixed top-0 left-0 w-full max-w-[200px] bg-white shadow-lg rounded-br-2xl border-r border-blue-200 z-40 p-6 ">
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-blue-600">Menu</h2>
          <button  className="text-red-500 font-semibold" onClick={() => setIsMenuItemsOpen(false)}>
            ✕
          </button>
        </div>
        <ul className="space-y-4">
          {NavMenus.map((menu, idx) => (
            <li key={idx}>
              <Link
                onClick={() => setIsMenuItemsOpen(false)}
                to={menu.path}
                className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium transition"
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
            

          <button className="bg-blue-500 p-1 rounded-xl md:hidden"  onClick={()=>setIsMenuItemsOpen(true)}>
          <Menu  size={34} className="text-white"/>
          </button>

          <h1 className="text-2xl font-bold text-blue-500">QuickFix</h1>
          <ul className="md:flex space-x-6 hidden md:visible">
            {
              NavMenus.map((menu,ind)=>(
                <div key={ind} className="flex flex-col relative overflow-hidden" onMouseEnter={()=>setIsHoveredIndex(ind)} onMouseLeave={()=>setIsHoveredIndex(null)}>
                <Link className=" cursor-pointer" to={menu.path}>{menu.label}</Link>
                <AnimatePresence>
                 {isHoveredIndex === ind &&
                 <motion.div
                    className="w-full h-[2px] bg-blue-500 absolute bottom-0 left-0"
                    initial={{width:0,opacity:0 , left:0 }}
                    animate={{width:"100%",opacity:1,left:0}}
                    exit={{width:0,opacity:0 , left:"100%"}}
                    transition={{duration:0.5}}
                  >
                  </motion.div>
                    }
                </AnimatePresence>
                </div>
              ))
            }
          </ul>
          <div>
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar className="bg-blue-500 cursor-pointer flex items-center justify-center w-10 h-10 rounded-full">
                    <div className="text-white font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isOpen && (
                  <DropdownMenuContent side="right" forceMount className="z-10">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="w-56 text-black mt-2 mr-1 bg-white border border-gray-200 shadow-md rounded-md p-2"
                    >
                      <DropdownMenuLabel className="text-base font-medium mb-2">
                        Logged in as {user?.name}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>navigate("/user/account")} className="flex items-center mb-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        Account
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={()=>handleLogOut()} className="flex items-center cursor-pointer text-red-600 hover:bg-red-100 p-2 rounded-md">
                        Logout
                      </DropdownMenuItem>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          </div>


        
      </div>
      </nav>
    </div>
  );
}

export default UserHeader;
