import LoadingSpinner from "./LoadingSpinner";

export const Dialog = ({
  open = false,
  title = "Title",
  submitText = "Submit",
  cancelText = "Cancel",
  isLoading = false,
  handleClose = () => null,
  handleCancel = () => null,
  handleSubmit = () => null,
}: {
  open: boolean;
  title: string;
  submitText: string;
  cancelText: string;
  isLoading?: boolean;
  handleClose: (e?: any) => void;
  handleCancel: (e?: any) => void;
  handleSubmit: (e?: any) => void;
}) => {
  return open ? (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-gray-100 bg-opacity-10 backdrop-blur"
      style={{ zIndex: 1000 }}
    >
      <div className=" relative space-y-6 bg-white w-100 h-100 px-12 py-6 rounded shadow-md">
        <div>
          <p className="text-lg font-semibold text-center max-w-[330px]">
            {title}
          </p>
        </div>
        <div className="flex space-x-8 justify-center items-center font-semibold">
          <button
            disabled={isLoading}
            onClick={handleCancel}
            className={`${
              isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            } flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none border-[#FF725E] bg-white text-black active:scale-95`}
          >
            {cancelText}
          </button>
          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`${
              isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"
            } flex space-x-2 h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none border-[#FF725E] bg-[#FF725E] text-white active:scale-95`}
          >
            {isLoading && <LoadingSpinner white={true} />}
            <p>{submitText}</p>
          </button>
        </div>
        <button
          type="button"
          className="absolute right-2 -top-4 rounded-md p-1 text-foreground/50 opacity-100 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
          toast-close=""
          data-radix-toast-announce-exclude=""
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <line x1="18" x2="6" y1="6" y2="18"></line>
            <line x1="6" x2="18" y1="6" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};
