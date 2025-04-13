import { useNavigate } from "react-router-dom";
import { useBackdrop } from "../hooks/Backdrop";
import { useState } from "react";
import { RenderForm } from "./RenderForm";
import { formTemplates, getFormId } from "../utils/utils";
import { GenerateFormAi } from "./GenerateFormAi";

export const TemplatesDialog = ({
  onClose = () => null,
}: {
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useBackdrop();

  const [templates, setTemplates] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);
  const [AIForm, setAIForm] = useState<boolean>(false);

  const createForm = async () => {
    showLoader();
    const newFormId = await getFormId();
    hideLoader();
    navigate(`/forms/${newFormId}/edit`);
  };

  const handleUseTemplate = () => {
    const id = formTemplates[selectedTemplate]?.id;
    navigate(`/templates/${id}/edit`);
  };

  const handleBack = () => {
    setTemplates(false);
    setAIForm(false);
  };

  const handleAIForm = () => {
    navigate("/form-ai");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 flex justify-center ${
        templates || AIForm ? "" : "items-center"
      } md:items-center bg-gray-100 bg-opacity-10 backdrop-blur`}
      style={{ zIndex: 1000 }}
    >
      <div
        className={`relative bg-white m-4 border-2 px-6 md:px-8 py-8 rounded-md shadow-md overflow-auto 
    transition-transform duration-300 ease-in-out ${
      templates || AIForm ? "scale-100" : "scale-95"
    } min-w-[300px] md:min-w-[400px]`}
      >
        <div>
          <p className="text-center pb-2">Create a form in seconds</p>
        </div>
        {templates || AIForm ? (
          <div>
            <div className="mt-4 mb-6">
              <img
                onClick={handleBack}
                src="/arrow-left.svg"
                alt="arrow-left-icon"
                className="w-5 h-5 cursor-pointer transition-all duration-75 active:scale-90"
              />
            </div>
            {templates ? (
              <div className="flex space-x-0 md:space-x-4 space-y-4 md:space-y-0 flex-col md:flex-row">
                <div className="w-full md:w-[300px] flex flex-row md:flex-col max-w-[300px] border rounded-md max-h-[400px] overflow-auto left-panel">
                  {formTemplates?.map?.((template: any, index: number) => (
                    <button
                      onClick={() => setSelectedTemplate(index)}
                      key={index}
                      className={`${
                        selectedTemplate === index
                          ? "bg-gray-50 font-medium"
                          : ""
                      } w-[100%] p-2 border-r md:border-b text-sm hover:bg-gray-50`}
                    >
                      {template?.name}
                    </button>
                  ))}
                </div>
                <div className="w-full md:w-[500px] max-h-[400px] overflow-y-auto left-panel pl-0 border rounded-md py-4">
                  <div className="w-full flex justify-end px-4 py-2">
                    <button
                      onClick={handleUseTemplate}
                      className="text-xs px-4 py-2 rounded-md bg-black text-white font-semibold transition-all duration-75 active:scale-95 focus:outline-none"
                    >
                      Use Template
                    </button>
                  </div>
                  <RenderForm
                    templatePreview={true}
                    fields={formTemplates[selectedTemplate]?.fields}
                    title={formTemplates[selectedTemplate]?.name}
                  />
                </div>
              </div>
            ) : (
              <div className="min-h-[400px] max-h-[400px]">
                <GenerateFormAi />
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-8 justify-center md:justify-around items-center text-sm">
            <button
              onClick={() => setTemplates(true)}
              className="w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-gray-500 text-gray-600 hover:text-black"
            >
              <svg
                className="w-6 h-6"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M19.4 20H4.6a.6.6 0 01-.6-.6V4.6a.6.6 0 01.6-.6h14.8a.6.6 0 01.6.6v14.8a.6.6 0 01-.6.6zM11 12V4M4 12h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                ></path>
              </svg>
              <p>Explore Templates</p>
            </button>
            {/* <button
              // onClick={() => setAIForm(true)}
              onClick={handleAIForm}
              className="text-purple-600 border-purple-600 font-semibold w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-purple-500 text-purple-500"
            >
              <svg
                className="w-6 h-6 stroke-purple-600 animate-pulse"
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
              <p>AI Form Generator</p>
            </button> */}
            <button
              onClick={createForm}
              className="w-full flex justify-center items-center space-x-2 border-2 border-gray-300 px-4 py-10 rounded-md transition-all duration-75 active:scale-95 hover:border-gray-500 text-gray-600 hover:text-black"
            >
              <svg
                className="w-5 h-5"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M9 12h3m3 0h-3m0 0V9m0 3v3M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <p>Empty Form</p>
            </button>
          </div>
        )}
        <button
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity"
          onClick={onClose}
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
  );
};
