import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { AlignJustify } from 'lucide-react';

function ProviderHeader({ setIsOpenSidebar }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <nav className="bg-blue-100 p-4 text-blue-500 shadow-sm w-full">
                <div className="container mx-auto flex justify-between md:justify-between items-center w-full">
                    <Button
                        onClick={() => setIsOpenSidebar(true)}
                        className="lg:hidden md:block mb-5 mt-2 bg-blue-500"
                        as={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <AlignJustify />
                        <span className='sr-only'>Toggle Menu</span>
                    </Button>
                    
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className='flex items-start flex-col justify-start'
                    >
                        <h1 className="text-2xl font-bold text-blue-500">QuickFix</h1>
                        <p>Hire Professional Service Provider</p>
                    </motion.div>
                    
                    <DropdownMenu onOpenChange={setIsOpen}>
                        <DropdownMenuTrigger asChild>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Avatar className="bg-blue-500 cursor-pointer flex items-center justify-center w-10 h-10 rounded-full">
                                    <div className="text-white font-bold">
                                        {user.name[0].toUpperCase()}
                                    </div>
                                </Avatar>
                            </motion.button>
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
                                        <DropdownMenuItem className="flex items-center mb-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={() => handleLogOut()}
                                            className="flex items-center cursor-pointer text-red-600 hover:bg-red-100 p-2 rounded-md"
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </motion.div>
                                </DropdownMenuContent>
                            )}
                        </AnimatePresence>
                    </DropdownMenu>
                </div>
            </nav>
        </motion.div>
    );
}

export default ProviderHeader;
