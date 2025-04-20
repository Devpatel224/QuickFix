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

      
      <Card className="w-full h-screen flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="w-full lg:w-1/2 bg-blue-400 text-white flex flex-col justify-center p-6">
          <h1 className="text-3xl font-bold">QuickFix</h1>
          <p className="mt-4 text-lg">
            Join QuickFix today! Whether you're a service provider or a user, we
            have the best platform to connect you with reliable services.
          </p>
        </div>

        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center">
          <Tabs
            defaultValue="user"
            className="w-[80%]"
            onValueChange={setUserType}
          >
            <TabsList className="flex mx-auto mb-4 w-[35%]">
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="provider">Service Provider</TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  User Registration
                </CardTitle>
                <p>
                  Already Have Account?
                  <Link
                    to="/auth/login"
                    className="font-medium ml-2 text-primary hover:underline cursor-pointer"
                  >
                    Sign In
                  </Link>
                </p>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 relative"
                >
                  <div>
                    <Input
                      {...register("name")}
                      name="name"
                      placeholder="Enter Full Name *"
                      required
                    />
                    {errors.name && (
                      <span className="text-red-600 pl-2">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      name="email"
                      placeholder="Enter Email *"
                      required
                    />
                    {errors.email && (
                      <span className="text-red-600 pl-2">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

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
                    className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering...":"Register"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            <TabsContent value="provider">
              <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                  Service Provider Registration
                </CardTitle>
                <Link to="/auth/login">
                  Already Have Account?
                  <span className="font-medium ml-2 text-primary hover:underline cursor-pointer">
                    Sign In
                  </span>
                </Link>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      {...register("name")}
                      name="name"
                      placeholder="Enter Full Name *"
                      required
                    />
                    {errors.name && (
                      <span className="text-red-600 pl-2">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("email")}
                      type="email"
                      name="email"
                      placeholder="Enter Email *"
                      required
                    />
                    {errors.email && (
                      <span className="text-red-600 pl-2">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("company")}
                      type="text"
                      name="company"
                      placeholder="Enter Company Name *"
                      required
                    />
                    {errors.company && (
                      <span className="text-red-600 pl-2">
                        {errors.company.message}
                      </span>
                    )}
                  </div>
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
                    className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black"
                  >
                    Register
                  </Button>
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
