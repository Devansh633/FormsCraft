export const Label = ({
  htmlFor = "label",
  text = "label",
  onClick = () => null,
}: {
  htmlFor: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <label
      htmlFor={htmlFor}
      onClick={onClick}
      className="text-sm font-semibold"
    >
      {text}
    </label>
  );
};
