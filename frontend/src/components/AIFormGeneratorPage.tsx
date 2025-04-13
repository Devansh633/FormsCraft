import { useEffect, useState } from "react";
import { GenerateFormAi } from "./GenerateFormAi";
import { Navbar } from "./Navbar";
import { useAuth } from "../hooks/Auth";
import { supabaseClient } from "../config/supabase-client";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Button } from "./ui/Button";
import { useToast } from "../hooks/Toast";
import { PricingTabs } from "./PricingTabs";

declare global {
  interface Window {
    LemonSqueezy: any;
  }
}

export const AIFormGeneratorPage = () => {

  return (
    <div className={`flex flex-col h-screen`}>
      <Navbar />
        <div className="flex-1 overflow-auto">
          <GenerateFormAi />
        </div>
      
    </div>
  );
};
