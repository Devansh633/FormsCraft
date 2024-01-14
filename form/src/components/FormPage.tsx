import { useNavigate, useParams } from "react-router-dom";
import { EFieldTypes } from "../store/type/field.type";
import { RenderForm } from "./RenderForm";
import { useEffect, useState } from "react";
import { useBackdrop } from "../hooks/Backdrop";
import { supabaseClient } from "../config/supabase-client";

export const FormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, showLoader, hideLoader } = useBackdrop();

  const [data, setData] = useState<any>({});
  const [premium, setPremium] = useState<boolean>(false);

  const fetchData = async () => {
    showLoader();
    const { data, error } = await supabaseClient
      .from("forms")
      .select("*")
      .eq("form_id", id)
      .eq("published", true);
    // console.log(data?.[0].fields)
    if (!error) {
      if (data?.length === 0) {
        navigate("/");
      }
      setData(data?.[0]);
      // const { data: premium_data, error: premium_error }: any =
      //   await supabaseClient
      //     .from("premium_users")
      //     .select("user_id")
      //     .eq("user_id", data?.[0]?.user_id);
      // if (!premium_error && premium_data?.length > 0) {
      //   setPremium(true);
      //   console.log(premium_data.fields)
      // }
    }
    hideLoader();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? null : (
    <RenderForm
      fields={data?.fields}
      title={data?.name}
      id={data?.form_id}
      premium={premium}
    />
  );
};
