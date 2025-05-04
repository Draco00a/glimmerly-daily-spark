
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Facebook, Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Inserisci un indirizzo email valido"),
  password: z.string().min(6, "La password deve contenere almeno 6 caratteri"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<"email" | "social">("email");
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = (data: LoginFormData) => {
    console.log("Login submitted with:", data);
    // Here you would typically perform authentication
    // For now, we'll just log the data
  };
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="bg-glimmerly-gradient bg-clip-text text-4xl font-bold text-transparent">
            Glimmerly
          </h1>
          <p className="mt-2 text-muted-foreground">
            Accedi per scoprire nuove sfide quotidiane
          </p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-6 flex justify-center space-x-4">
            <Button
              variant={loginMethod === "email" ? "default" : "outline"}
              className={`flex-1 ${loginMethod === "email" ? "bg-glimmerly-gradient" : ""}`}
              onClick={() => setLoginMethod("email")}
            >
              Email
            </Button>
            <Button
              variant={loginMethod === "social" ? "default" : "outline"}
              className={`flex-1 ${loginMethod === "social" ? "bg-glimmerly-gradient" : ""}`}
              onClick={() => setLoginMethod("social")}
            >
              Social
            </Button>
          </div>

          {loginMethod === "email" ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center rounded-md border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring">
                          <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Email"
                            className="border-0 focus-visible:ring-0"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-glimmerly-gradient"
                >
                  Accedi
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.24 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continua con Google
              </Button>
              <Button variant="outline" className="w-full">
                <Facebook className="mr-2 h-5 w-5 text-blue-600" />
                Continua con Facebook
              </Button>
              <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54v-2.879h2.54V9.686c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.879h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="black"/>
                </svg>
                Continua con Apple
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Non hai un account?{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Registrati
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
