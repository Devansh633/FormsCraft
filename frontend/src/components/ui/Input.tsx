import { EFieldTypes } from "../../store/type/field.type";

type InputTypes =
  | EFieldTypes.TEXT
  | EFieldTypes.EMAIL
  | EFieldTypes.FILE
  | EFieldTypes.URL
  | EFieldTypes.SEARCH
  | EFieldTypes.NUMBER
  | EFieldTypes.PHONE;

export const Input = ({
  placeholder = "placeholder",
  name = "input",
  required = true,
  id = "email",
  type = EFieldTypes.TEXT,
  value = "",
  disabled = false,
  onChange = () => null,
}: {
  placeholder: string;
  name: string;
  required?: boolean;
  id: string;
  type: InputTypes;
  value?: string;
  disabled?: boolean;
  onChange?: any;
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      pattern={type === EFieldTypes.PHONE ? "[0-9]{10}" : undefined}
      className="mt-1 block w-full appearance-none rounded-md border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
    />
  );
};
