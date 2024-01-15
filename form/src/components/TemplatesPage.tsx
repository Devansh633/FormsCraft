import { useEffect, useRef, useState } from "react";
import { formTemplates } from "../utils/utils";
import { RenderForm } from "./RenderForm";

export const TemplatesPage = () => {
  const popoverRef = useRef<any>(null);

  const [previewTemplate, setPreviewTemplate] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number>(0);

  const handlePreviewTemplate = (index: number = 0) => {
    if (index < 0) return;
    setPreviewTemplate(true);
    setSelectedTemplate(index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setPreviewTemplate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <p className="text-2xl font-bold">Templates</p>
      <div className="py-8 flex flex-wrap items-center">
        {formTemplates?.map?.((template: any, index: number) => (
          <div
            key={index}
            className="w-full md:w-[300px] lg:w-[350px] mr-0 md:mr-8 mb-8 space-y-4 px-6 py-4 border-2 rounded-md"
          >
            <div className="space-y-2">
              <p className="font-semibold">{template?.name}</p>
              <p className="text-sm">{template?.description}</p>
            </div>
            <div className="w-[100px]">
              <button
                onClick={() => handlePreviewTemplate(index)}
                className="bg-[#ff725e] text-white text-sm font-semibold px-4 py-2 rounded-md transition-all duration-75 active:scale-95 focus:outline-none"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
      {previewTemplate && (
        <div
          className={`fixed top-0 left-0 w-full h-full z-50 flex justify-center  bg-gray-100 bg-opacity-10 backdrop-blur`}
          style={{ zIndex: 1000 }}
        >
          <div
            ref={popoverRef}
            className={`relative bg-white m-4 border-2 px-6 md:px-8 py-8 rounded-md shadow-md overflow-auto 
      transition-transform duration-300 ease-in-out left-panel`}
          >
            <div className="md:w-[500px]">
              <RenderForm
                templatePreview={true}
                fields={formTemplates[selectedTemplate]?.fields}
                title={formTemplates[selectedTemplate]?.name}
              />
            </div>
            <button
              className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity"
              onClick={() => setPreviewTemplate(false)}
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
    </div>
  );
};
