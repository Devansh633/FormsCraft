import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Auth";
import { useEffect, useRef, useState } from "react";
import { supabaseClient } from "../config/supabase-client";
import { useToast } from "../hooks/Toast";
import { useBackdrop } from "../hooks/Backdrop";

export const Navbar = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { showLoader, hideLoader } = useBackdrop();
  const popoverRef = useRef<any>(null);

  const [toggleLogout, setToggleLogout] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"forms" | "form-ai" |"mcq">("forms");

  const handleLogout = async () => {
    showLoader();
    const { error } = await supabaseClient.auth.signOut();
    hideLoader();
    if (!error) {
      showToast("Logged out successfully!", "Thanks for the visit.");
    } else {
      showToast("Failed to logout!", "Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setToggleLogout(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (window.location.pathname?.includes?.("form-ai")) {
      setSelectedTab("form-ai");
    }else if (window.location.pathname?.includes?.("mcq")) {
      setSelectedTab("mcq");
    }  
    else {
      setSelectedTab("forms");
    }
  }, []);

  return (
    <div
      className="sticky top-0 w-full bg-white border-b pt-6 px-4 md:px-16 lg:px-32 space-y-8"
      style={{ zIndex: 10 }}
    >
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src="/f.png" alt="logo" className="w-[3rem]" />
        </Link>
        <button
          ref={popoverRef}
          className="relative px-3 py-1 bg-[#ff725e] text-white rounded-full shadow-md cursor-pointer"
          onClick={() => setToggleLogout((prv) => !prv)}
        >
          <div className="font-semibold">
            {user?.email?.[0]?.toUpperCase?.() || "U"}
          </div>
          {toggleLogout && (
            <div className="absolute top-10 right-0 bg-white border shadow-2xl rounded-md">
              <div
                className="text-sm text-black font-semibold px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="flex space-x-8">
        <div className="w-fit">
          <Link to="/">
            <p
              className={`${
                selectedTab === "forms" ? "font-medium border-b-2" : ""
              } text-sm  w-fit pb-2 border-gray-900 cursor-pointer`}
            >
              My Forms
            </p>
          </Link>
        </div>
        {/* <div className="w-fit">
          <Link to="/mcq">
            <p
              className={`${
                selectedTab === "mcq" ? "font-medium border-b-2" : ""
              } text-sm  w-fit pb-2 border-gray-900 cursor-pointer`}
            >
              MCQ Generator
            </p>
          </Link>
        </div> */}
        
        {/* <div className="w-fit">
          <Link to="/form-ai">
            <p
              className={`${
                selectedTab === "form-ai" ? "font-medium border-b-2" : ""
              } flex space-x-2 text-sm  w-fit pb-2 border-gray-900 cursor-pointer`}
            >
              <span>Form AI</span>
              <svg
                className="w-4 h-4 stroke-purple-600"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 15c4.875 0 7-2.051 7-7 0 4.949 2.11 7 7 7-4.89 0-7 2.11-7 7 0-4.89-2.125-7-7-7zM2 6.5c3.134 0 4.5-1.318 4.5-4.5 0 3.182 1.357 4.5 4.5 4.5-3.143 0-4.5 1.357-4.5 4.5 0-3.143-1.366-4.5-4.5-4.5z"
                  className={`${
                    selectedTab === "form-ai"
                      ? "stroke-purple-600"
                      : "stroke-gray-800"
                  } `}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};
