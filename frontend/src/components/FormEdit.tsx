import { useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./ui/LoadingSpinner";
import { CreateForm } from "./CreateForm";

export const FormEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const [name, setName] = useState<string>("");
  const [fields, setFields] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFields = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("forms")
      .select("name, fields")
      .eq("user_id", user?.id)
      .eq("form_id", id);
    if (!error) {
      setName(data?.[0]?.name || "");
      setFields(data?.[0]?.fields || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <CreateForm id={id || ""} fields={fields} name={name} />
  );
};
