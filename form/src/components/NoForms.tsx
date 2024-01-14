import { Button } from "./ui/Button";
// import NoFormsIcon from "no-forms.png";

export const NoForms = () => {
  return (
    <div className="bg-white space-y-6 flex flex-col justify-center items-center py-10 rounded-lg shadow">
      <p className="text-lg font-semibold">You don't have any forms yet!</p>
      <img src="/sub.svg" className="w-60 md:w-80 h-60 md:h-80" />
    </div>
  );
};
