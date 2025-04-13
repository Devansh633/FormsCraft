import React, { useEffect, useRef, useState } from "react";
import { NoForms } from "./NoForms";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { FormItem } from "./FormItem";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import LoadingSpinner from "./ui/LoadingSpinner";
import { Link } from "react-router-dom";

export const Forms = () => {
  const { user } = useAuth();
  const popoverRef = useRef<any>(null);

  const [forms, setForms] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"created_at" | "submissions">(
    "created_at"
  );
  const [toggleSort, setToggleSort] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleSortClick = () => {
    setToggleSort((prv) => !prv);
  };

  const handleSort = (
    e: React.MouseEvent,
    sort: "created_at" | "submissions"
  ) => {
    e.stopPropagation();
    setSortBy(sort);
    setToggleSort(false);
  };

  const fetchForms = async () => {
    setIsLoading(true);
    const { data, error } = await supabaseClient
      .from("forms")
      .select("id,form_id,name,published, submissions")
      .eq("user_id", user?.id)
      .order(sortBy, { ascending: false });
    if (!error) {
      console.log(data);
      setForms(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setToggleSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    fetchForms();
  }, [sortBy]);

  return (
    <div className="py-4 md:py-10 px-4 md:px-16 lg:px-32">
      {isLoading ? (
        <div className="flex justify-center items-center h-60 w-full">
          <LoadingSpinner />
        </div>
      ) : forms.length > 0 ? (
        <div className="space-y-12">
          <div className="flex flex-wrap md:space-y-0 justify-between items-center">
            <div>
              <div className="hidden md:block">
                <Label htmlFor="searchForms" text="Search Forms" />
              </div>
              <input
                type="search"
                placeholder="Search"
                id="searchForms"
                name="searchForms"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="text-sm mt-1 block w-36 md:w-44 appearance-none rounded-md border-2 border-gray-200 bg-white px-3 py-1.5 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
              />
            </div>
            <div>
              <button
                ref={popoverRef}
                className="relative flex justify-between items-center bg-white py-2 px-4 w-40 md:w-44 shadow rounded-md cursor-pointer transition-all duration-75 active:scale-95"
                onClick={handleSortClick}
              >
                <div className="flex justify-center items-center space-x-3">
                  <img src="menu.svg" alt="sort-icon" className="w-3 h-3" />
                  <p className="text-sm">Sort by</p>
                </div>
                <img
                  src={toggleSort ? "nav-arrow-up.svg" : "nav-arrow-down.svg"}
                  alt="arrow-icon"
                  className="w-5 h-5"
                />
                {toggleSort && (
                  <div className="absolute top-10 left-0 bg-white shadow-2xl rounded-md">
                    <div
                      onClick={(e) => handleSort(e, "created_at")}
                      className="flex justify-between items-center py-2 px-4 w-40 md:w-44 cursor-pointer rounded-md hover:bg-gray-100"
                    >
                      <div className="flex justify-center items-center space-x-3">
                        <img
                          src="sort.svg"
                          alt="sort-icon"
                          className="w-4 h-4"
                        />
                        <p className="text-sm">Created at</p>
                      </div>
                      {sortBy === "created_at" && (
                        <img
                          src="check.svg"
                          alt="arrow-icon"
                          className="w-4 h-4"
                        />
                      )}
                    </div>
                    <div
                      onClick={(e) => handleSort(e, "submissions")}
                      className="flex justify-between items-center py-2 px-4 w-40 md:w-44 cursor-pointer rounded-md hover:bg-gray-100"
                    >
                      <div className="flex justify-center items-center space-x-3">
                        <img
                          src="sort.svg"
                          alt="sort-icon"
                          className="w-4 h-4"
                        />
                        <p className="text-sm">Submissions</p>
                      </div>
                      {sortBy === "submissions" && (
                        <img
                          src="check.svg"
                          alt="arrow-icon"
                          className="w-4 h-4"
                        />
                      )}
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="flex flex-col space-y-6">
            {forms?.map?.((formItem: any, i: number) => {
              // console.log(formItem)
              if (
                
                formItem?.name
                  ?.toLowerCase?.()
                  ?.includes?.(search?.toLowerCase?.())
              ) {
                return (
                  <Link
                    key={i}
                    to={
                      formItem?.published
                        ? `/forms/${formItem?.form_id}`
                        : `/forms/${formItem?.form_id}/edit`
                    }
                  >
                    <FormItem item={formItem} />
                  </Link>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <NoForms />
      )}
    </div>
  );
};
