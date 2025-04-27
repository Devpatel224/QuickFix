import { deleteProvider, getProviders } from "@/store/admin-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

function AdminProvider() {
  const dispatch = useDispatch();
  const { isLoading, providers } = useSelector((state) => state.admin);
  const { toast } = useToast();

  const [confirmDelete, setConfirmDelete] = useState({ open: false, providerId: null });

  const deleteClick = async (id) => {
    dispatch(deleteProvider({ id })).then((data) => {
      if (data.payload.success) {
        toast({
          title: "Provider Deleted",
          description: "Provider Deleted Successfully",
          variant: "success",
          duration: 2000,
          action: null,
        });
      } else {
        toast({
          title: "Error",
          description: data.payload.message,
          variant: "destructive",
          duration: 2000,
          action: null,
        });
      }
    });

    setTimeout(() => {
      dispatch(getProviders());
    }, 200);
  };

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  if (isLoading) return <div className="text-xl text-gray-400 text-center mt-10">Loading...</div>;

  return (
    <>

      <div className="p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 bg-gray-50 min-h-screen">
        {providers?.map((provider) => (
          <motion.div
            key={provider._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center transition duration-300"
          >
            <div className="w-24 h-24 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {provider?.name?.charAt(0)}
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">{provider?.name}</h2>
            <p className="text-gray-600"><strong>Email:</strong> {provider?.email}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {provider?.contact || 'N/A'}</p>
            <p className="text-gray-600"><strong>Company:</strong> {provider?.company || 'N/A'}</p>

            <div className="w-full mt-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Services:</h3>
              {provider?.services?.length > 0 ? (
                <div className="space-y-4">
                  {provider.services.map((service) => (
                    <div key={service._id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                      <p className="text-gray-700"><strong>Service Name:</strong> {service.servicename}</p>
                      <p className="text-gray-600"><strong>Category:</strong> {service.category}</p>
                      <p className="text-gray-600"><strong>Address:</strong> {service.address}</p>
                      <p className="text-gray-600"><strong>Visit Price:</strong> ₹{service.visitprice}</p>
                      <p className="text-gray-500 text-sm"><strong>Description:</strong> {service.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">No services available</p>
              )}
            </div>

            <button
              onClick={() => setConfirmDelete({ open: true, providerId: provider._id })}
              className="mt-6 bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Delete Provider
            </button>
          </motion.div>
        ))}
      </div>

      
      <AnimatePresence>
        {confirmDelete.open && (
          <motion.div
            className="fixed inset-0  backdrop-blur-[1PX] bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-[90%] max-w-md shadow-lg text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Are you sure?</h2>
              <p className="text-gray-600 mb-6">This action will permanently delete the provider and all related services.</p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    deleteClick(confirmDelete.providerId);
                    setConfirmDelete({ open: false, providerId: null });
                  }}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setConfirmDelete({ open: false, providerId: null })}
                  className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AdminProvider;
