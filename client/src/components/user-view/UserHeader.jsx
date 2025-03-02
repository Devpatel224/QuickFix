import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";


function UserHeader() {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const {toast} = useToast()
  const navigate = useNavigate()

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


  return (
    <div>
      <nav className="bg-blue-500 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">QuickFix</h1>
          <ul className="flex space-x-6">
            <li className="hover:underline cursor-pointer">Home</li>
            <li className="hover:underline cursor-pointer">Services</li>
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Contact</li>
          </ul>
          <div>
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button>
                  <Avatar className="bg-gray-800 cursor-pointer flex items-center justify-center w-10 h-10 rounded-full">
                    <div className="text-white font-bold">
                      {user.name[0].toUpperCase()}
                    </div>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <AnimatePresence>
                {isOpen && (
                  <DropdownMenuContent side="right" forceMount>
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
                      <DropdownMenuItem className="flex items-center mb-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
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
