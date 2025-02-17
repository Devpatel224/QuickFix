import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Login() {
   const [formData, setFormData] = useState({ name: "", email: "", password: "", company: "" });


   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const endpoint = userType === "user" ? "/api/register/user" : "/api/register/provider";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
          <Card className="w-full  h-screen flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
            {/* Left Side - Description */}
            <div className="w-full lg:w-1/2 bg-blue-400 text-white flex flex-col justify-center p-6">
              <h1 className="text-3xl font-bold">QuickFix</h1>
              <p className="mt-4 text-lg">Join QuickFix today! Whether you're a service provider or a user, we have the best platform to connect you with reliable services.</p>
            </div>
            {/* Right Side - Form */}
            <div className="w-full  lg:w-1/2 p-6 flex flex-col items-center justify-center">
              
                  <CardHeader className="w-full   text-foreground text-foreground-muted">
                    <CardTitle className='tracking-tight text-center font-bold text-foreground  text-2xl'>User Registration</CardTitle>
                    <p className="text-center">Don't Have Account?<Link to='/auth/register' className="font-medium ml-2 text-primary hover:underline cursor-pointer">Sign Up</Link></p>
                  </CardHeader>
                  <CardContent className="w-[80%]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input name="name" placeholder="Full Name" onChange={handleChange} required />
                      <Input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                      <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                      <Button type="submit" className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black">Register</Button>
                    </form>
                  </CardContent>                
               
            </div>
          </Card>
        </div>
  )
}

export default Login