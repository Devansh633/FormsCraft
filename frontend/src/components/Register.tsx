import { Input } from "./ui/Input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/Auth";
import { supabaseClient } from "../config/supabase-client";
import { useToast } from "../hooks/Toast";
import { EFieldTypes } from "../store/type/field.type";

export const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const { data, error }: any = await supabaseClient.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });
    setEmail("");
    setIsLoading(false);
    if (error) {
      return showToast("Failed to send magic link", error.message);
    }
    showToast(
      "Magic link sent!",
      "Please check your mail for your magic link."
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      navigate("/");
    }
    document.title = "Sign up for FormsCraft";
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link to="/">
            <img src="/f.png" alt="logo" className="w-[5rem]" />
          </Link>
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Use your email address to sign up.
          </p>
        </div>
        <form
          className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
          onSubmit={handleSignup}
        >
          <div>
            <label htmlFor="email" className="block text-xs text-gray-600">
              EMAIL ADDRESS
            </label>
            <Input
              type={EFieldTypes.EMAIL}
              placeholder="example@email.com"
              id="email"
              name="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <p className="text-[12px] mt-2">
              Note: By signing up you agree to our{" "}
              <Link to="/terms" className="font-semibold">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-semibold">
                Privacy
              </Link>{" "}
              policies
            </p>
          </div>
          <Button
            text="Send magic link"
            isLoading={isLoading}
            loadingText={isLoading ? "Sending..." : ""}
          />
          <p className="text-center text-sm text-gray-600">
            Already registered?{" "}
            <Link to="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>{" "}
            to your account.
          </p>
        </form>
      </div>
    </div>
  );
};
