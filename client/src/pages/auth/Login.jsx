import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/auth-slice";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/zodValidation/validation";




function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  
  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((response) => {
      if (response?.payload?.success) {
        toast({ title: response?.payload?.message });
        navigate("/dashboard"); 
      } else {
        toast({
          title: response?.payload || "Login failed",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full h-screen flex flex-col lg:flex-row bg-white shadow-xl rounded-lg overflow-hidden">
        
        <div className="w-full lg:w-1/2 bg-blue-400 text-white flex flex-col justify-center p-6">
          <h1 className="text-3xl font-bold">QuickFix</h1>
          <p className="mt-4 text-lg">
            Join QuickFix today! Whether you're a service provider or a user,
            we have the best platform to connect you with reliable services.
          </p>
        </div>

        
        <div className="w-full lg:w-1/2 p-6 flex flex-col items-center justify-center">
          <CardHeader className="w-full text-foreground text-foreground-muted">
            <CardTitle className="tracking-tight text-center font-bold text-foreground text-2xl">
              User Login
            </CardTitle>
            <p className="text-center">
              Don't Have Account?
              <Link
                to="/auth/register"
                className="font-medium ml-2 text-primary hover:underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </CardHeader>

          <CardContent className="w-[80%]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  onCopy={(e) => e.preventDefault()}
                  onPaste={(e) => e.preventDefault()}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-100 hover:bg-blue-500 border-blue-800 border-[1px] text-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Login;
