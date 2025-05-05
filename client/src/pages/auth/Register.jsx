import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/auth-slice/index";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { motion } from "framer-motion";
import ShowStrength from "@/components/auth/ShowStrength";
import { registerSchema } from "@/zodValidation/validation";

const Register = () => {
  const [userType, setUserType] = useState("user");

  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [visibleProviderPassword, setVisibleProviderPassword] = useState(false);
  const [visibleProviderConfirmPassword, setVisibleProviderConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { toast  } = useToast();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  let { password } = watch();

  const onSubmit = async (data) => {
    let { confirmPassword, ...newData } = data;
    console.log(newData)

    let sendData = { ...newData, role: userType };
    dispatch(registerUser(sendData)).then((data) => {
      if (data?.payload?.success){
        navigate("/auth/login");
        toast({ variant: "success", title: "Register Successful" });
      } else {
        toast({ title: data?.payload, variant: "destructive" });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      
      <Card className="w-full h-screen flex flex-col lg:flex-row items-center justify-center bg-white shadow-xl rounded-lg overflow-hidden">
         <div className="hidden lg:h-full lg:flex lg:w-1/2 bg-blue-500 text-white p-8 flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">QuickFix</h1>
            <p className="text-lg">
              Join QuickFix today! Whether you're a service provider or a user,
              we connect you with trusted services.
            </p>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs defaultValue="user" onValueChange={setUserType}>
              <TabsList className="flex justify-center mb-6 space-x-2">
                <TabsTrigger value="user" className="w-1/2">User</TabsTrigger>
                <TabsTrigger value="provider" className="w-1/2">Service Provider</TabsTrigger>
              </TabsList>

              {/** --- USER FORM --- */}
              <TabsContent value="user">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    User Registration
                  </CardTitle>
                  <p className="mt-1 text-sm">
                    Already have an account?
                    <Link to="/auth/login" className="ml-2 text-blue-500 hover:underline">
                      Sign In
                    </Link>
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register("name")} placeholder="Full Name *" />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

                    <Input {...register("email")} type="email" placeholder="Email *" />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    {/* Password */}
                     <div>
                    <div className="relative">
                      <Input
                        {...register("password")}
                        type={visiblePassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password *"
                        required
                        className="pr-10"
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                      />
                      <motion.span
                        onClick={() => setVisiblePassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        {visiblePassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </motion.span>
                    </div>
                    {password && <ShowStrength password={password} />}
                    {errors.password && (
                      <span className="text-red-600 pl-2">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="relative mt-4">
                      <Input
                        {...register("confirmPassword")}
                        type={visibleConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter Confirm Password *"
                        required
                        className="pr-10"
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                      />
                      <motion.span
                        onClick={() =>
                          setVisibleConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        {visibleConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </motion.span>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-red-600 pl-2">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>

              {/** --- PROVIDER FORM --- */}
              <TabsContent value="provider">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-blue-600">
                    Service Provider Registration
                  </CardTitle>
                  <p className="mt-1 text-sm">
                    Already have an account?
                    <Link to="/auth/login" className="ml-2 text-blue-500 hover:underline">
                      Sign In
                    </Link>
                  </p>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...register("name")} placeholder="Full Name *" />
                    {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

                    <Input {...register("email")} type="email" placeholder="Email *" />
                    {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

                    <Input {...register("company")} placeholder="Company Name *" />
                    {errors.company && <p className="text-red-600 text-sm">{errors.company.message}</p>}

                     <div>
                    <div className="relative">
                      <Input
                        {...register("password")}
                        type={visibleProviderPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter Password *"
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        required
                      />
                      <motion.span
                        onClick={() =>
                          setVisibleProviderPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        {visibleProviderPassword ? <IoMdEyeOff /> : <IoMdEye />}
                      </motion.span>
                    </div>
                    {password && <ShowStrength password={password} />}
                    {errors.password && (
                      <span className="text-red-600 pl-2">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Input
                        {...register("confirmPassword")}
                        type={
                          visibleProviderConfirmPassword ? "text" : "password"
                        }
                        name="confirmPassword"
                        placeholder="Enter Confirm Password *"
                        onCopy={(e) => e.preventDefault()}
                        onCut={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        required
                      />
                      <motion.span
                        onClick={() =>
                          setVisibleProviderConfirmPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-600"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                      >
                        {visibleProviderConfirmPassword ? (
                          <IoMdEyeOff />
                        ) : (
                          <IoMdEye />
                        )}
                      </motion.span>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-red-600 pl-2">
                        {errors.confirmPassword.message}
                      </span>
                    )}
                  </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </Button>
                  </form>
                </CardContent>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
        
         
      </Card>
    </div>
  );
};

export default Register;
