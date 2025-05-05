import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSpecificService } from "@/store/user-slice";
import { useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";  

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function TileService({ service, index }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cursorRef = useRef()
  const btnRef = useRef() 

  const handleOpenServiceDetail = (service) => {
    dispatch(getSpecificService(service._id));
    navigate(`/user/serviceDetail/${service._id}`);
  };

  useGSAP(()=>{
    gsap.to(".btn-container",{
        
    })
  })

  function handleMouseMoveInBtn(event){
    let rect = btnRef.current.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    gsap.to(cursorRef.current,{
      x,
      y,
      scale:12,
      duration:1,
      ease: "power4.out",
      autoAlpha: 1
    })
    gsap.to(btnRef.current,{
      color:"white",
      duration:0.5
    })
  }

  function handleMouseLeaveInBtn(event){

    let rect = btnRef.current.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

     gsap.to(cursorRef.current,{
      x:x,
      y:y,
      scale:0,
      duration:1,
      ease: "power4.out",
      autoAlpha:0
     })
     gsap.to(btnRef.current,{
      color:"black",
      duration:0.5
    })
  }

  return (
    <motion.div
      key={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="flex"
    >
      <Card className="bg-white shadow-md hover:shadow-lg transition-all rounded-lg overflow-hidden flex flex-col w-full h-full">
        <img
          src={service.image}
          alt={service.name}
          width={400}
          height={250}
          className="w-full h-70 object-cover "
        />
        <CardHeader className="flex-1">
          <CardTitle className="text-xl font-bold text-blue-600">
            {service.servicename}
          </CardTitle>
          <p className="text-sm text-gray-500">{service.category}</p>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-1">
          <p className="text-sm font-semibold text-gray-900">
            Visit Price: ₹{service.visitprice}{" "}
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Location: {service.address}
          </p>          

          <div  className="btn-container relative overflow-hidden rounded-xl" onMouseMove={handleMouseMoveInBtn} onMouseLeave={handleMouseLeaveInBtn}>
            <span ref={cursorRef} className="cursor w-6 h-6 invisible absolute bg-blue-500 rounded-full pointer-events-none z-0"></span>
            <button
              ref={btnRef}
              onClick={()=>{handleOpenServiceDetail(service)}}
              className=" bg-gray-100 rounded-xl  text-black z-20  w-full overflow-hidden px-3 text-center py-[9px]"
            >
              <span className="relative z-10">View More Details</span>
            </button>
            </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default TileService;