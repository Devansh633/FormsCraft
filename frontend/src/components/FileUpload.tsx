import React, { useState, ChangeEvent } from "react";
import axios from "axios";

interface FileUploadProps {
  onFileUpload: (mcqs: InputObject[]) => void;
  onFileUpload2?: (mcqs: InputObject[]) => void;
}

interface InputOptions {
  a: string;
  b: string;
  c: string;
  d: string;
}

interface InputObject {
  bloom_taxonomy: string;
  correct: string;
  number: string;
  options: InputOptions;
  question: string;
  type: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, onFileUpload2 }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("file.pdf");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target?.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "file.pdf");
  };

  function normalizeJson(data: any): InputObject[] {
    const mcqs = data.mcqs || {};
    const normalizedData: InputObject[] = Object.keys(mcqs).map(key => {
      const item = mcqs[key];
      return {
        number: key,
        type: "mcq",
        question: item.mcq,
        correct: item.correct,
        bloom_taxonomy: item["Bloom's Taxonomy"],
        options: item.options,
      };
    });

    console.log(normalizedData);
    return normalizedData;
  }

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data && response.data.mcqs) {
          const mcqs = normalizeJson(response.data);
          onFileUpload(mcqs);
        } else {
          throw new Error("Invalid response data or missing mcqs");
        }
      } catch (error: any) {
        setError(error.response?.data?.error || "Error uploading file");
        console.error("Error uploading file", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="flex justify-start items-center">
      <div className="flex items-center border-2 border-[#ff725e] p-2 rounded-md">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="btn2 px-3 py-2 border-none bg-[#ff725e] text-white font-bold rounded cursor-pointer"
        >
          Choose File
        </label>
        <span className="ml-5 mr-5">{fileName}</span>
        {fileName !== "file.pdf" && (
          <button
            onClick={handleFileUpload}
            className="btn px-4 py-2 border-2 border-[#ff725e] bg-[#ff725e] text-white font-bold rounded cursor-pointer"
          >
            Generate MCQs
          </button>
        )}
        {isLoading && (
  <div className="loader ml-5 border-4 border-t-[#ff725e] border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full w-6 h-6 animate-spin"></div>
)}

        {error && <div className="ml-5 text-red-500">{error}</div>}
      </div>
    </div>
  );
};
