import { useState } from "react";

export const CheckboxInput = ({
  index = 0,
  preview = false,
  options = ["Option 1", "Option 2"],
  handleEditOption = (e: any, index: number, optionIndex: number) => null,
  handleAddOption = (index: number) => null,
  handleDeleteOption = (index: number, optionIndex: number) => null,
}: {
  index: number;
  preview?: boolean;
  options: string[];
  handleEditOption: (e: any, index: number, optionIndex: number) => void;
  handleAddOption: (index: number) => void;
  handleDeleteOption: (index: number, optionIndex: number) => void;
}) => {
  const handleKeyDown = (e: any, optionIndex: number) => {
    if (options.length === 1) return;
    if (
      (e.keyCode === 8 && options[optionIndex].length === 0) ||
      e.keyCode === 46
    ) {
      handleDeleteOption(index, optionIndex);
    }
  };

  return (
    <div className="mt-1">
      {options?.map?.((option: string, optionIndex: number) => (
        <div key={optionIndex} className="flex space-x-2 items-center mt-2">
          <input
            disabled={preview}
            type="checkbox"
            id={preview ? "option" : `${option}-${optionIndex}`}
          />
          <input
            disabled={preview}
            placeholder="Option"
            value={option}
            onChange={(e) => handleEditOption(e, index, optionIndex)}
            onKeyDown={(e) => handleKeyDown(e, optionIndex)}
            className="text-sm font-semibold outline-none bg-transparent"
          />
        </div>
      ))}
      {!preview && (
        <button
          onClick={(e) => handleAddOption(index)}
          className="text-[12px] font-semibold border-2 border-gray-300 mt-2 px-2 py-0 rounded-md active:scale-95"
        >
          Add
        </button>
      )}
    </div>
  );
};
