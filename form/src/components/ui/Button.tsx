import LoadingSpinner from "./LoadingSpinner";

export const Button = ({
  text = "Button",
  isLoading = false,
  isDisabled = false,
  loadingText = "Loading",
  onClick = () => null,
}: {
  text: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  loadingText?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`${
        isLoading || isDisabled
          ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
          : " bg-[#ff725e] text-white hover:bg-black opacity-100"
      } flex w-full px-6 py-2 max-h-10 items-center justify-center space-x-2 rounded-md border text-sm font-semibold transition-all duration-75 active:scale-95 focus:outline-none`}
    >
      {isLoading && <LoadingSpinner />}
      <p>{isLoading ? loadingText : text}</p>
    </button>
  );
};
