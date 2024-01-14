import { Link, useParams } from "react-router-dom";
import { CreateForm } from "./CreateForm";
import { formTemplates, getFormId } from "../utils/utils";
import { useEffect, useState } from "react";
import LoadingSpinner from "./ui/LoadingSpinner";
import { useBackdrop } from "../hooks/Backdrop";
import { Button } from "./ui/Button";

export const TemplateFormEdit = () => {
  const { id } = useParams();
  const { showLoader, hideLoader } = useBackdrop();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [formId, setFormId] = useState<string>("");

  const getData = async () => {
    showLoader();
    const newFormId = await getFormId();
    setFormId(newFormId);
    for (let i = 0; i < formTemplates?.length; i++) {
      if (formTemplates[i]?.id === id) {
        const formFields = structuredClone(formTemplates[i]?.fields);
        setFields(formFields);
        setName(formTemplates[i]?.name);
        break;
      }
    }
    setIsLoading(false);
    hideLoader();
  };

  useEffect(() => {
    getData();
  }, []);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <LoadingSpinner />
    </div>
  ) : fields?.length > 0 ? (
    <CreateForm id={formId} fields={[...fields]} name={name} />
  ) : (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <p className="text-xl font-semibold">Template not found</p>
        <div className="w-[160px]">
          <Link to="/dashboard">
            <Button text="Go Back" />
          </Link>
        </div>
      </div>
    </div>
  );
};
