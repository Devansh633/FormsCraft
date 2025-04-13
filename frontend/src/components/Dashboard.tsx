import { useState } from "react";
import { Forms } from "./Forms";
import { Navbar } from "./Navbar";
import { Button } from "./ui/Button";
import { TemplatesDialog } from "./TemplatesDialog";

export const Dashboard = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  return (
    <div>
      <Navbar />
      <div className="w-full bg-white border-b py-8 px-4 md:px-16 lg:px-32 space-y-8">
        <div className="flex justify-between items-center">
          <p className="text-xl">My Forms</p>
          <div>
            <Button text="Create Form" onClick={() => setDialog(true)} />
          </div>
          {dialog && <TemplatesDialog onClose={() => setDialog(false)} />}
        </div>
      </div>
      <div className="pb-28">
        <Forms />
      </div>
    </div>
  );
};
