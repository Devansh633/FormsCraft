import { useRef, useState } from "react";

export const FileInput = ({
  preview = false,
  templatePreview = false,
  published = false,
  handleFileChange = () => null,
  error = false,
  selectedFile = undefined,
}: {
  preview?: boolean;
  templatePreview?: boolean;
  published?: boolean;
  handleFileChange?: any;
  error?: boolean;
  selectedFile?: File | undefined;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!published || templatePreview) return;
    fileRef?.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      className={`${preview ? "px-1 py-6 text-xs" : "px-6 py-8 text-sm"} ${
        error ? "border-red-500" : "border-gray-300"
      } flex flex-col space-y-2 justify-center items-center mt-1 rounded border-2  shadow-sm bg-white`}
    >
      <input
        ref={fileRef}
        onChange={handleFileChange}
        type="file"
        className="hidden"
      />
      <div className="flex space-x-2 justify-center items-center cursor-pointer">
        <img src="/upload.svg" alt="upload-icon" className="w-4 h-4" />
        <p>Click here to upload a file</p>
      </div>
      <div>
        {selectedFile && !preview && (
          <p className="text-center">
            File Selected:{" "}
            <span className="font-semibold">{selectedFile?.name}</span>
          </p>
        )}
      </div>
    </div>
  );
};
