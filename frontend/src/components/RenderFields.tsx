import { useRef, useState } from "react";
import { EFieldTypes } from "../store/type/field.type";
import { CheckboxInput } from "./ui/CheckboxInput";
import { DateInput } from "./ui/DateInput";
import { DropDown } from "./ui/DropDown";
import { FileInput } from "./ui/FileInput";
import { Label } from "./ui/Label";
import { useToast } from "../hooks/Toast";
import { isTypeInEnum } from "../utils/utils";

export const RenderFields = ({
  item = {},
  handleEditLabel = (e: any, index: number) => null,
  handleEditPlaceholder = (e: any, index: number) => null,
  handleDelete = (index: number) => null,
  handleEditOption = (e: any, index: number, optionIndex: number) => null,
  handleAddOption = (index: number) => null,
  handleDeleteOption = (index: number, optionIndex: number) => null,
  handleRequired = (index: number) => null,
  index = 0,
  preview = false,
}: {
  item: any;
  handleEditLabel?: (e: any, index: number) => void;
  handleEditPlaceholder?: (e: any, index: number) => void;
  handleDelete?: (index: number) => void;
  handleEditOption?: (e: any, index: number, optionIndex: number) => void;
  handleAddOption?: (index: number) => void;
  handleDeleteOption?: (index: number, optionIndex: number) => void;
  handleRequired?: (index: number) => void;
  index?: number;
  preview?: boolean;
}) => {
  const inputRef = useRef<any>(null);
  const { showToast } = useToast();

  const [editLabel, setEditLabel] = useState<boolean>(false);

  const render = () => {
    switch (item?.type) {
      case EFieldTypes.TEXT:
      case EFieldTypes.EMAIL:
      case EFieldTypes.SEARCH:
      case EFieldTypes.URL:
      case EFieldTypes.PHONE:
        return (
          <input
            disabled={preview}
            type={item.type}
            placeholder={item.placeholder}
            id={`${item.id}-id-${index}`}
            name={`${item.id}-id-${index}`}
            value={item.placeholder}
            onChange={(e) => handleEditPlaceholder(e, index)}
            className="text-gray-400 font-medium mt-1 block w-full appearance-none rounded-md border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
          />
        );
      case EFieldTypes.NUMBER:
        return (
          <input
            disabled={preview}
            type={EFieldTypes.TEXT}
            placeholder={item.placeholder}
            id={`${item.id}-id-${index}`}
            name={`${item.id}-id-${index}`}
            value={item.placeholder}
            onChange={(e) => handleEditPlaceholder(e, index)}
            className="text-gray-400 font-medium mt-1 block w-full appearance-none rounded-md border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-400 focus:outline-none focus:ring-black sm:text-sm"
          />
        );
      case EFieldTypes.CHECKBOX:
        return (
          <CheckboxInput
            index={index}
            preview={preview}
            options={item?.options}
            handleEditOption={handleEditOption}
            handleAddOption={handleAddOption}
            handleDeleteOption={handleDeleteOption}
          />
        );
      case EFieldTypes.DROPDOWN:
        return (
          <DropDown
            index={index}
            preview={preview}
            options={item?.options}
            handleEditOption={handleEditOption}
            handleAddOption={handleAddOption}
            handleDeleteOption={handleDeleteOption}
          />
        );
      case EFieldTypes.FILE:
        return <FileInput preview={preview} />;
      case EFieldTypes.DATE:
        return <DateInput preview={preview} />;
      default:
        return null;
    }
  };

  const handleLabelClick = () => {
    setEditLabel(true);
    setTimeout(() => {
      inputRef?.current?.focus?.();
    }, 0);
  };

  const handleBlur = () => {
    if (item?.label?.length === 0)
      return showToast("Label cannot be empty", "Please enter a label");
    setEditLabel(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleBlur();
    }
  };

  return isTypeInEnum(item?.type) ? (
    <div className="group">
      {preview ? (
        <Label text={item?.label} htmlFor={item.id} />
      ) : !editLabel ? (
        <div className="flex items-center space-x-1">
          <label
            onClick={handleLabelClick}
            htmlFor={item?.id}
            className="text-sm font-semibold cursor-text"
          >
            {item?.label}
          </label>
          <p className="text-lg font-semibold text-red-500">
            {item?.required && (
              <span onClick={() => handleRequired(index)}>*</span>
            )}
          </p>
        </div>
      ) : (
        <input
          ref={inputRef}
          disabled={preview}
          placeholder="Label"
          value={item.label}
          onChange={(e) => handleEditLabel(e, index)}
          onKeyDown={handleKeyDown}
          className="mb-1 text-sm font-semibold outline-none bg-transparent"
          onBlur={handleBlur}
        />
      )}
      <div className="relative block">
        {render()}
        {!preview && (
          <button
            className="absolute -top-1 -right-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition ease-in-out duration-200 active:scale-95"
            onClick={() => handleDelete(index)}
          >
            <img src="/close-circle.svg" alt="close-icon" className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  ) : null;
};
