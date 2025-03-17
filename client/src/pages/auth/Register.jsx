import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import {registerUser} from "../../store/auth-slice/index"




const Register = () => {
  const [userType, setUserType] = useState("user");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", company: "" });
  const navigate = useNavigate()
  const {toast} = useToast()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    let sendData = {...formData,role : userType}

    
    dispatch(registerUser(sendData)).then((data)=>{
      console.log(data);      
    if(data?.payload?.success){
      console.log("It's going to here")
      navigate('/auth/login');
      toast({
        variant :'success',
        title: "Register Successfull",
      })
    }else{
      toast({
        title:data?.payload,
        variant:'destructive',
      })
    }
    console.log(data)
  })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
      <Card className="w-full  h-screen flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
        
        <div className="w-full lg:w-1/2 bg-blue-400 text-white flex flex-col justify-center p-6">
          <h1 className="text-3xl font-bold">QuickFix</h1>
          <p className="mt-4 text-lg">Join QuickFix today! Whether you're a service provider or a user, we have the best platform to connect you with reliable services.</p>
        </div>
        
        <div className="w-full  lg:w-1/2 p-6 flex items-center justify-center">
          <Tabs defaultValue="user" className="w-[80%]" onValueChange={setUserType}>
            <TabsList className="flex mx-auto mb-4 w-[35%]">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="provider">Service Provider</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">User Registration</CardTitle>
                <p className="">Already Have Account?<Link to='/auth/login' className="font-medium ml-2 text-primary hover:underline cursor-pointer">Sign In</Link></p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" placeholder="Full Name" onChange={handleChange} required />
                  <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                  <Button type="submit" className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black">Register</Button>
                </form>
              </CardContent>
            </TabsContent>
            <TabsContent value="provider">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">Service Provider Registration</CardTitle>
                <Link to='/auth/login' className="">Already Have Account?<span className="font-medium ml-2 text-primary hover:underline cursor-pointer">Sign Up</span></Link>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" placeholder="Full Name" onChange={handleChange} required />
                  <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                  <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                  <Input name="company" placeholder="Company Name" onChange={handleChange} required />
                  <Button type="submit" className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black">Register</Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default Register;
