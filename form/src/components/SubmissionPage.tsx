import { useState, useEffect } from "react";
import { FormItem } from "./FormItem";
import { Navbar } from "./Navbar";
import LoadingSpinner from "./ui/LoadingSpinner";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { Link, useParams } from "react-router-dom";
import { Submissions } from "./Submissions";

export const SubmissionPage = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [item, setItem] = useState<any>({});

  const fetchForm = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("forms")
      .select("id,form_id,name,published, submissions")
      .eq("user_id", user?.id)
      .eq("form_id", id);
    if (!error) {
      setItem(data?.[0]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="py-4 md:py-10 px-4 md:px-16 lg:px-32">
        {isLoading ? (
          <div className="flex justify-center items-center h-60 w-full">
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <Link to="/dashboard">
                <img
                  src="/arrow-left.svg"
                  alt="arrow-left-icon"
                  className="w-5 h-5 cursor-pointer transition-all duration-75 active:scale-90"
                />
              </Link>
            </div>
            <FormItem item={item} />
            <Submissions form_id={id}/>
          </div>
        )}
      </div>
    </div>
  );
};
