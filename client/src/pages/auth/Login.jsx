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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data)).then((response) => {
      if (response?.payload?.success) {
        toast({ title: response?.payload?.message });
        console.log(response.payload.user.role)
        if(response?.payload?.user?.role === "provider"){
          navigate('/service-provider/dashboard')
        }
        else if(response?.payload?.user?.role === "user"){
          navigate('/user')
        }
        else if(response?.payload?.user?.role === "admin"){
          navigate('/admin/dashboard')
        }
      } else {
        toast({
          title: response?.payload || "Login failed",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className=" w-full h-screen flex  bg-gray-100 ">
      <Card className="flex flex-col lg:flex-row shadow-lg w-full h-full overflow-hidden rounded-xl items-center justify-center">
     
        <div className="hidden lg:flex lg:w-1/2 bg-blue-500 text-white p-8 flex-col justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">QuickFix</h1>
          <p className="text-lg">
            Join QuickFix today! Whether you're a service provider or a user,
            we connect you with trusted services.
          </p>
        </div>

       
        <div className="w-full lg:w-1/2 p-8 flex items-center justify-center bg-white">
          <div className="w-full max-w-md">
            <CardHeader className="mb-4 text-center">
              <CardTitle className="text-3xl font-bold text-blue-600">
                User Login
              </CardTitle>
              <p className="mt-2 text-gray-600 text-sm">
                Don’t have an account?
                <Link
                  to="/auth/register"
                  className="ml-2 text-blue-500 font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <Input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.email.message}
                    </p>
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
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
