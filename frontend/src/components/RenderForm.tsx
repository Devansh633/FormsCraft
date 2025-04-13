import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/Label";
import { EFieldTypes } from "../store/type/field.type";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { FileInput } from "./ui/FileInput";
import logo from "../logo.png";
import { Link } from "react-router-dom";
import { supabaseClient } from "../config/supabase-client";
import { useToast } from "../hooks/Toast";
import { v4 as uuidv4 } from "uuid";
import { isTypeInEnum } from "../utils/utils";

export const RenderForm = ({
  preview = false,
  templatePreview = false,
  fields = [],
  title = "",
  id = "",
  premium = false,
  handleClose = () => null,
}: {
  preview?: boolean;
  templatePreview?: boolean;
  fields: any[];
  title: string;
  id?: string;
  premium?: boolean;
  handleClose?: () => void;
}) => {
  const selectRef = useRef<any>(null);
  const { showToast } = useToast();

  const [fieldList, setFieldList] = useState<any[]>(fields);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [fileError, setFileError] = useState<boolean>(false);
  const [checkboxError, setCheckboxError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const scrollToElement = (id: string = "") => {
    const element = document.getElementById(id);
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2;
      window.scrollTo({ top: middle, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: any) => {
    e?.preventDefault?.();
    if (templatePreview) return;
    let found = [];
    for (let i = 0; i < fieldList.length; i++) {
      const field = fieldList[i];
      if (field?.required) {
        if (field?.type === EFieldTypes.FILE && !selectedFile) {
          setFileError(true);
          found.push(field?.id);
        } else if (
          field?.type != EFieldTypes.FILE &&
          field?.value?.length === 0
        ) {
          found.push(field?.id);
          if (field?.type === EFieldTypes.CHECKBOX) {
            setCheckboxError(true);
          }
        }
      }
    }
    if (found?.length) return scrollToElement(found?.[0]);

    const { data: formData, error: formError } = await supabaseClient
      .from("forms")
      .select("submissions")
      .eq("form_id", id);

    if (formError) {
      console.error("Error fetching form data:", formError);
      return showToast("Submission failed", "Please try again");
    }

    const currentSubmissions = formData?.[0]?.submissions ?? 0;
    // Update the form with the incremented submissions count
    const { data: updateFormData, error: updateFormError } = await supabaseClient
      .from("forms")
      .update({
        submissions: currentSubmissions + 1,
      })
      .eq("form_id", id);
    
    if (updateFormError) {
      console.error("Error updating form data:", updateFormError);
      return showToast("Submission failed", "Please try again");
    }
    if (preview) {
      setSubmitted(true);
    } 
    else {
      setIsLoading(true);

      if (selectedFile) {
          // Extract the file extension
          const fileExtension = selectedFile.name.split(".").pop();

          // Generate a unique filename with the UUID and the file extension
          const uniqueFilename = `${uuidv4()}.${fileExtension}`;
          const { data: fileData, error: fileError } =
            await supabaseClient.storage
              .from("uploads")
              .upload(uniqueFilename, selectedFile);
          if (fileError) {
            setIsLoading(false);
            return showToast("File upload failed", "Please try again");
          }
          const { data: signedUrlData, error: signedUrlError } = await supabaseClient.storage
            .from("uploads")
            .createSignedUrl(uniqueFilename, 60 * 60); // 1 hour

          if (signedUrlError) {
            setIsLoading(false);
            return showToast("Could not generate access URL", "Please try again");
          }
          
          for (let i = 0; i < fieldList.length; i++) {
            if (fieldList[i]?.type === EFieldTypes.FILE) {
              fieldList[i].value =signedUrlData.signedUrl;
            }
          }
      }

      const { data, error } = await supabaseClient
        .from("form_submissions")
        .insert({ form_id: id, submissions: fieldList });

      setIsLoading(false);
      if (!error) {
        setSubmitted(true);
        }
    }
        window.scroll(0, 0);
  };

  const handleValue = (e: any, index: number) => {
    let updatedValues = structuredClone(fieldList);
    updatedValues[index].value = e.target.value;
    setFieldList(updatedValues);
  };

  const handleCheckboxValue = (option: string, index: number) => {
    setCheckboxError(false);
    let updatedValues = structuredClone(fieldList);
    let values = updatedValues[index].value;
    const idx = values?.indexOf(option);
    if (idx === -1) {
      values?.push(option);
    } else {
      values?.splice(idx, 1);
    }
    updatedValues[index].value = values;
    setFieldList(updatedValues);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (premium || file?.size <= 5000000) {
      setSelectedFile(file);
      setFileError(false);
    } else {
      showToast("File Upload Failed", "File should be less than 5 MB");
    }
  };

  const render = (item: any, index: number) => {
    switch (item?.type) {
      case EFieldTypes.TEXT:
      case EFieldTypes.EMAIL:
      case EFieldTypes.SEARCH:
      case EFieldTypes.URL:
      case EFieldTypes.NUMBER:
      case EFieldTypes.PHONE:
      case EFieldTypes.DATE:
        return (
          <Input
            id={item?.id}
            name={item?.name}
            placeholder={item?.placeholder}
            type={item?.type}
            value={item?.value}
            required={item?.required}
            onChange={(e: any) => handleValue(e, index)}
          />
        );
      case EFieldTypes.CHECKBOX:
        return (
          <div id={item?.id}>
            {item?.options?.map((option: string, optionIndex: number) => (
              <div className="mt-2 flex space-x-2" key={optionIndex}>
                <input
                  type="checkbox"
                  checked={item?.value?.includes?.(option)}
                  id={option}
                  onChange={(e: any) => handleCheckboxValue(option, index)}
                />
                <Label text={option} htmlFor={option} />
              </div>
            ))}
            {checkboxError && (
              <p className="mt-2 text-sm font-semibold text-red-500">
                Filed is required
              </p>
            )}
          </div>
        );
      case EFieldTypes.DROPDOWN:
        return (
          <div className="relative">
            <select
              onChange={(e: any) => handleValue(e, index)}
              value={item?.value}
              ref={selectRef}
              required={item?.required}
              className={`${
                item?.value?.length ? "text-black" : "text-gray-400"
              } appearance-none text-sm font-semibold  w-full px-3 py-2 border-2 border-gray-300 bg-white rounded-md shadow-sm outline-none`}
            >
              <option value="" className="text-gray-400">
                Select option
              </option>
              {item?.options?.map((option: string, optionIndex: number) => (
                <option
                  className="font-semibold text-black"
                  value={option}
                  key={optionIndex}
                >
                  {option}
                </option>
              ))}
            </select>
            <img
              onClick={selectRef?.current?.click()}
              src="/nav-arrow-down.svg"
              alt="arrow-down-icon"
              className="absolute top-[12px] right-4 w-4 h-4"
            />
          </div>
        );
      case EFieldTypes.FILE:
        return (
          <div id={item?.id}>
            <FileInput
              published={true}
              // templatePreview={templatePreview}
              handleFileChange={handleFileChange}
              error={fileError}
              selectedFile={selectedFile}
            />
          </div>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setFieldList(fields);
  }, [fields]);

  return (
    <div>
      {preview && (
        <div className="flex justify-end w-full px-8 pt-8">
          <button className="active:scale-95" onClick={handleClose}>
            <img src="/close-circle.svg" alt="close-icon" className="w-6 h-6" />
          </button>
        </div>
      )}
      {submitted ? (
        <div className="flex flex-col space-y-6 justify-center items-center">
          <div className="mt-20 text-2xl font-semibold">
            Successfully Submitted
          </div>
          <img
            src="/check-circle.svg"
            alt="check-circle-icon"
            className="w-16 h-16"
          />
        </div>
      ) : (
        <div
          className={`${
            !templatePreview
              ? "px-0 lg:px-8 py-6 lg:py-16 ml-0 md:ml-12 lg:ml-48"
              : ""
          }`}
        >
          <div
            className={`${
              templatePreview ? "" : "mt-10"
            } px-8 md:px-20 mb-16 lg:mb-0`}
          >
            <h1 className="text-3xl font-semibold mb-8">{title}</h1>
            <form onSubmit={handleSubmit}>
              <div className="max-w-[350px] space-y-5">
                {fieldList?.map?.((field: any, index: number) => {
                  if (isTypeInEnum(field?.type)) {
                    return (
                      <div key={index}>
                        <div className="flex items-center space-x-1">
                          <Label text={field?.label} htmlFor={field.id} />
                          <p className="text-lg font-semibold text-red-500">
                            {field?.required && "*"}
                          </p>
                        </div>
                        {render(field, index)}
                      </div>
                    );
                  } else return null;
                })}
                {fieldList?.length > 0 && (
                  <div className="pt-6">
                    <Button
                      text="Submit"
                      isDisabled={templatePreview}
                      isLoading={isLoading}
                    />
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      {!templatePreview && !premium && (
        <Link
          to="/"
          target="_blank"
          className="fixed bottom-0 lg:bottom-8 right-0 lg:right-10 w-full lg:w-fit px-3 py-3 flex justify-center items-center space-x-2 text-sm font-semibold bg-white rounded-md shadow"
        >
          <img src='/f.png' alt="logo" className="w-6 h-6" />
          <p>Made with FormsCraft</p>
        </Link>
      )}
    </div>
  );
};
