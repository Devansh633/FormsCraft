import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Configuration, OpenAIApi } from "openai";
import { EFieldTypes } from "../store/type/field.type";
import { updateAIFormData } from "../utils/utils";
import LoadingSpinner from "./ui/LoadingSpinner";
import { RenderForm } from "./RenderForm";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useToast } from "../hooks/Toast";
import { useNavigate } from "react-router-dom";

export const GenerateFormAi = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const popoverRef = useRef<any>(null);

  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [generatedForms, setGeneratedForms] = useState<any[]>([]);
  const [selectedForm, setSelectedForm] = useState<number>(-1);
  const [isLoadingSavingAIForm, setIsLoadingSavingAIForm] =
    useState<boolean>(false);
  const [deletingId, setDeletedId] = useState<number>(-1);
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const updateAIForms = async ({
    name = "",
    fields = [],
  }: {
    name: string;
    fields: any[];
  }) => {
    setIsLoadingSavingAIForm(true);
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .insert({ user_id: user?.id, name: name, fields: fields });
    setIsLoadingSavingAIForm(false);
  };

  // const handleGenerateForm = async (e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const configuration = new Configuration({
  //     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  //   });
  //   const openai = new OpenAIApi(configuration);
  //   try {
  //     const res: any = await openai.createChatCompletion({
  //       model: "gpt-4-0613",
  //       //   model: "gpt-3.5-turbo-0613",
  //       messages: [{ role: "user", content: content }],
  //       functions: [
  //         {
  //           name: "generate_form",
  //           description:
  //             "Generate form based on the given input and maximum number of fields should be 20",
  //           parameters: {
  //             type: "object",
  //             properties: {
  //               id: {
  //                 type: "string",
  //                 description: "id of the form",
  //               },
  //               name: {
  //                 type: "string",
  //                 description: "name of the form",
  //               },
  //               description: {
  //                 type: "string",
  //                 description: "description of the form",
  //               },
  //               fields: {
  //                 description:
  //                   "generate form fields, should be array of objects",
  //                 type: "object",
  //                 properties: {
  //                   id: {
  //                     type: "string",
  //                     description: "id of the form field",
  //                   },
  //                   type: {
  //                     type: "string",
  //                     enum: [
  //                       "text",
  //                       "email",
  //                       "number",
  //                       "date",
  //                       "file",
  //                       "dropdown",
  //                       "url",
  //                       "checkbox",
  //                       "tel",
  //                     ],
  //                     description: "type of the form field",
  //                   },
  //                   label: {
  //                     type: "string",
  //                     description: "label of the form field",
  //                   },
  //                   required: {
  //                     type: "boolean",
  //                     description: "whether form field is required or not",
  //                   },
  //                   placeholder: {
  //                     type: "string",
  //                     description: "placeholder of the form field",
  //                   },
  //                   options: {
  //                     type: "string",
  //                     description:
  //                       "these are options for field type checkbox and dropdown only and is string array and at least should have one option",
  //                   },
  //                   value: {
  //                     type: "string",
  //                     description:
  //                       "this is value property of string type for field type dropdown and string array for field type checkbox and empty array or empty string by default",
  //                   },
  //                 },
  //               },
  //             },
  //             required: ["id", "name", "description", "fields"],
  //           },
  //         },
  //       ],
  //       function_call: {
  //         name: "generate_form",
  //       },
  //     });
  //     console.log({res})
  //     const args: any =
  //       res?.data?.choices?.[0]?.message?.function_call?.arguments;

  //     if (args) {
  //       let data = JSON?.parse?.(args);
  //       data = updateAIFormData(data);
  //       setSelectedForm(0);
  //       setGeneratedForms([data, ...generatedForms]);
  //       setIsLoading(false);
  //       setContent("");
  //       await updateAIForms({ name: data?.name, fields: data?.fields });
  //     } else {
  //       const content = res?.data?.choices?.[0]?.message?.content;
  //       const jsonMatch = content.match(/```json\s+({[\s\S]*?})\s+```/);
  //       if (jsonMatch && jsonMatch[1]) {
  //         const formDataString = jsonMatch[1];
  //         try {
  //           let formData = JSON.parse(formDataString);
  //           formData = updateAIFormData(formData);
  //           setSelectedForm(0);
  //           setGeneratedForms([formData, ...generatedForms]);
  //         } catch (error) {
  //           setIsLoading(false);
  //           showToast("Something Failed!", "Invalid JSON found");
  //         }
  //         setIsLoading(false);
  //       } else {
  //         setIsLoading(false);
  //         showToast(
  //           "Something Failed!",
  //           res?.data?.choices?.[0]?.message?.content
  //         );
  //       }
  //     }
  //   } catch (e: any) {
  //     console.log({ e });
  //     setIsLoading(false);
  //     showToast("Something Failed!", e?.response?.data?.error?.message);
  //   }
  // };

  const handleGenerateForm = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://146.190.158.50:8080/api/premium/form-ai", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      var data = await res.json();

      if (data?.error) {
        setIsLoading(false);
        return showToast("Something Failed!", data?.error);
      }

      data = updateAIFormData(data?.form_data);
      setSelectedForm(0);
      setGeneratedForms([data, ...generatedForms]);
      setIsLoading(false);
      setContent("");
      await updateAIForms({ name: data?.name, fields: data?.fields });
    } catch (e: any) {
      setIsLoading(false);
      showToast("Something Failed!", e?.message);
    }
  };

  const handleDeleteGeneratedForm = async (id: number) => {
    setDeletedId(id);
    const { data, error } = await supabaseClient
      .from("ai_forms")
      .delete()
      .eq("user_id", user?.id)
      .eq("id", id);
    if (!error) {
      await fetchGeneratedForms(false);
      setSelectedForm(0);
      showToast(
        "Successfully Deleted",
        `Deleted your AI generated form with id ${id}`
      );
    }
    setDeletedId(-1);
  };

  const handleUseAIGeneratedForm = () => {
    navigate(`/ai/${generatedForms[selectedForm]?.id}/edit`);
  };

  const fetchGeneratedForms = async (initial: boolean = true) => {
    if (initial) {
      setIsLoadingData(true);
    }
    const { data, error }: any = await supabaseClient
      .from("ai_forms")
      .select("id, name, fields")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (!error && data?.length > 0) {
      setGeneratedForms(data || []);
      setSelectedForm(0);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    fetchGeneratedForms();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setToggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setContent("");
    setToggleMenu(false);
  }, [selectedForm]);

  return isLoadingData ? (
    <div className="w-full h-[500px] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="w-full h-full p-2 md:p-4 flex space-x-0 md:space-x-4 space-y-2 md:space-y-0 flex-col md:flex-row">
      <div className="hidden md:flex flex-col w-[25%] p-2 border-2 rounded-md  text-sm">
        {generatedForms?.length === 0 ? (
          <div className="h-full flex justify-center items-center italic">
            No forms generated
          </div>
        ) : (
          <div className="h-full flex flex-col space-y-2">
            <p>Forms Generated</p>
            <div className="flex flex-col h-full space-y-2 overflow-auto left-panel py-1">
              <button
                onClick={() => setSelectedForm(-1)}
                className={`bg-gray-100 border border-gray-300 w-full px-1 py-2 text-sm border relative rounded-md`}
              >
                <p className="line-clamp-1 break-words flex justify-center items-center space-x-1">
                  <svg
                    className="w-5 h-5"
                    width="24px"
                    height="24px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#000000"
                  >
                    <path
                      d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>New Form</span>
                </p>
              </button>
              {generatedForms?.map?.((form: any, index: number) => (
                <button
                  onClick={() => setSelectedForm(index)}
                  key={index}
                  className={`${
                    selectedForm === index ? "shadow" : ""
                  } bg-white border border-gray-300 w-full px-1 py-2 text-sm border relative rounded-md  hover:shadow`}
                >
                  <p className="line-clamp-1 break-words">
                    {deletingId === form?.id
                      ? "Deleting..."
                      : form?.name?.length > 20
                      ? form?.name?.substr(0, 20) + "..."
                      : form?.name}
                  </p>
                  {selectedForm === index && (
                    <div
                      className="text-gray-800 hover:text-red-600"
                      onClick={() => handleDeleteGeneratedForm(form?.id)}
                    >
                      <svg
                        className="w-[14px] absolute right-3 top-3"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        color="currentColor"
                      >
                        <path
                          d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="md:hidden relative">
        <img
          src="/hamburger.svg"
          alt="menu"
          className="w-5 h-5 ml-2"
          onClick={() => setToggleMenu(true)}
        />
      </div>
      {toggleMenu && (
        <div
          className={`fixed md:hidden top-0 left-0 w-full h-full z-50 flex justify-center  bg-gray-100 bg-opacity-10 backdrop-blur`}
          style={{ zIndex: 1000 }}
        >
          <div
            ref={popoverRef}
            className={`relative bg-white m-4 border-2 px-6 md:px-8 py-8 rounded-md shadow-md overflow-auto 
    transition-transform duration-300 ease-in-out left-panel w-full`}
          >
            <div className="flex flex-col h-full w-full p-2 border-2 rounded-md  text-sm">
              {generatedForms?.length === 0 ? (
                <div className="h-full flex justify-center items-center italic">
                  No forms generated
                </div>
              ) : (
                <div className="h-full flex flex-col space-y-2">
                  <p>Forms Generated</p>
                  <div className="flex flex-col h-full space-y-2 overflow-auto left-panel py-1">
                    <button
                      onClick={() => setSelectedForm(-1)}
                      className={`bg-gray-100 border border-gray-300 w-full px-1 py-2 text-sm border relative rounded-md`}
                    >
                      <p className="line-clamp-1 break-words flex justify-center items-center space-x-1">
                        <svg
                          className="w-5 h-5"
                          width="24px"
                          height="24px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                        <span>New Form</span>
                      </p>
                    </button>
                    {generatedForms?.map?.((form: any, index: number) => (
                      <button
                        onClick={() => setSelectedForm(index)}
                        key={index}
                        className={`${
                          selectedForm === index ? "shadow" : ""
                        } bg-white border border-gray-300 w-full px-1 py-2 text-sm border relative rounded-md  hover:shadow`}
                      >
                        <p className="line-clamp-1 break-words">
                          {deletingId === form?.id
                            ? "Deleting..."
                            : form?.name?.length > 20
                            ? form?.name?.substr(0, 20) + "..."
                            : form?.name}
                        </p>
                        {selectedForm === index && (
                          <div
                            className="text-gray-800 hover:text-red-600"
                            onClick={() => handleDeleteGeneratedForm(form?.id)}
                          >
                            <svg
                              className="w-[14px] absolute right-3 top-3"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              color="currentColor"
                            >
                              <path
                                d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              className="absolute right-2 top-1 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity"
              onClick={() => setToggleMenu(false)}
            >
              <svg
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 9L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 9L9 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="md:w-[75%] h-full p-2 border-2 rounded-md">
        <div className="h-full flex flex-col justify-between">
          <div className="max-h-full h-full overflow-auto left-panel">
            <div className="py-4 h-full">
              {!generatedForms ? (
                <div className="text-sm flex justify-center items-center h-full">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <p>Generate form using AI</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="w-full flex justify-end px-4 py-2">
                    {selectedForm != -1 && (
                      <button
                        disabled={isLoadingSavingAIForm}
                        onClick={handleUseAIGeneratedForm}
                        className={`${
                          isLoadingSavingAIForm
                            ? "cursor-not-allowed opacity-70"
                            : ""
                        } text-xs px-4 py-2 rounded-md bg-black text-white font-semibold transition-all duration-75 active:scale-95 focus:outline-none`}
                      >
                        {isLoadingSavingAIForm ? "Loading..." : "Use Template"}
                      </button>
                    )}
                  </div>
                  {selectedForm != -1 ? (
                    <RenderForm
                      templatePreview={true}
                      fields={generatedForms[selectedForm]?.fields}
                      title={generatedForms[selectedForm]?.name}
                    />
                  ) : (
                    <div className="flex h-full justify-center items-center">
                      <div className="flex space-x-2 items-center opacity-70">
                        <p className="font-semibold">Form AI</p>
                        <svg
                          className="w-4 h-4 stroke-purple-600"
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 15c4.875 0 7-2.051 7-7 0 4.949 2.11 7 7 7-4.89 0-7 2.11-7 7 0-4.89-2.125-7-7-7zM2 6.5c3.134 0 4.5-1.318 4.5-4.5 0 3.182 1.357 4.5 4.5 4.5-3.143 0-4.5 1.357-4.5 4.5 0-3.143-1.366-4.5-4.5-4.5z"
                            className="stroke-purple-600"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {selectedForm === -1 && (
            <form
              onSubmit={handleGenerateForm}
              className="flex space-x-4 items-center px-0 md:px-4"
            >
              <Input
                type={EFieldTypes.TEXT}
                placeholder="Ex:- Create a feedback form"
                id="content"
                name="content"
                value={content}
                onChange={(e: any) => setContent(e.target.value)}
              />
              <div className="w-[100px] md:w-[200px]">
                <Button
                  text="Generate"
                  loadingText="Generating..."
                  isLoading={isLoading}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
