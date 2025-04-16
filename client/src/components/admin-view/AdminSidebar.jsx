import  { Fragment } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, BadgeCheck, Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { FaRegAddressCard } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const adminsidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard size={22} />,
    },
    {
      id: 'Providers',
      label: 'Providers',
      path: '/admin/providers',
      icon: <FaRegAddressCard size={22} />,
    },
  ];
  
  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 40 } },
  };

  const MenuItemsShow = () => {
      const navigate = useNavigate()
    return (
      <motion.div initial="hidden" animate="visible" variants={sidebarVariants}>
        {adminsidebarMenuItems.map((menuItem) => (
          <motion.div
            onClick={() => navigate(menuItem.path)}            
            key={menuItem.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-lg font-medium cursor-pointer text-blue-500 hover:bg-blue-600 hover:text-white"
          >
            {menuItem.icon}
            <span>{menuItem.label}</span>
          </motion.div>
        ))}
      </motion.div>
    );
  };
  

function AdminSidebar({isOpenSidebar,setIsOpenSidebar}) {
 return (
    <Fragment>     
      <Sheet open={isOpenSidebar} onOpenChange={setIsOpenSidebar} className='min-h-screen'>
        <SheetContent side="left" className="bg-blue-100 w-64 h-full text-blue-500 ">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-blue-500">Provider Panel</SheetTitle>
          </SheetHeader>
          <MenuItemsShow />
        </SheetContent>
      </Sheet>

      
      <motion.aside
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        className="hidden w-64 flex-col border-r min-h-screen bg-blue-100 p-6 text-blue-500 lg:flex"
      >
        <div className="flex items-center gap-2 cursor-pointer  text-blue-500 hover:text-blue-700">
          <h1 className="text-xl font-extrabold mb-2">Provider Panel</h1>
        </div>
        <MenuItemsShow />
      </motion.aside>
    </Fragment>
  );
}

export default AdminSidebar