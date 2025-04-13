import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useToast } from "../hooks/Toast";
import copy from "copy-to-clipboard";
import { Link, useNavigate } from "react-router-dom";
import { Dialog } from "./ui/Dialog";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";

export const FormItem = ({ item = {} }: { item: any }) => {
  const { showToast } = useToast();
  const { user } = useAuth();
  const popoverRef = useRef<any>(null);
  const navigate = useNavigate();

  const [toggleCopy, setToggleCopy] = useState<boolean>(false);
  const [toggleMore, setToggleMore] = useState<boolean>(false);
  const [deleteDialog, setDeleteDialog] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    copy(`${window.location.origin}/r/${item?.form_id}`);
    setToggleCopy(true);
    setTimeout(() => {
      showToast(
        "Successfully copied to clipboard",
        "Now you can share this link"
      );
      setToggleCopy(false);
    }, 1000);
  };

  const handleMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleMore((prv) => !prv);
  };

  const handleDeleteOption = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setToggleMore(false);
    setDeleteDialog(true);
  };

  const handleEditOption = () => {
    navigate(`/forms/${item?.form_id}/edit`);
  };

  const handleClose = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setDeleteDialog(false);
  };

  const handleSubmit = async (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setIsDeleting(true);
    const { data, error } = await supabaseClient
      .from("forms")
      .delete()
      .eq("user_id", user?.id)
      .eq("id", item?.id);
    setIsDeleting(false);
    setDeleteDialog(false);
    if (!error) {
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setToggleMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="bg-white px-4 md:px-6 py-4 rounded-md shadow transition-all hover:shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-1">
              <p className="text-sm md:text-md md:text-lg font-semibold text-blue-700 line-clamp-1 break-words">
                {`${window.location.host}/r/${item?.form_id}`}
              </p>
              <div className="cursor-pointer" onClick={handleCopy}>
                <img
                  src={toggleCopy ? "/check.svg" : "/copy.svg"}
                  alt="copy-icon"
                  className="w-5 h-5 hover:scale-90"
                />
              </div>
              <p className="text-[8px] md:text-xs font-medium text-gray-600 px-2 bg-gray-200 rounded-full">
                {item?.published ? (
                  <span className="flex space-x-2">
                    <span>{item?.submissions || 0}</span>
                    <span className="hidden md:block">submissions</span>
                  </span>
                ) : (
                  <span>Draft</span>
                )}
              </p>
            </div>
            <p className="text-xs md:text-sm font-semibold text-gray-600">
              {item?.name || "Untitled"}
            </p>
          </div>
          <button
            ref={popoverRef}
            onClick={handleMore}
            className="relative cursor-pointer px-1 py-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-75"
          >
            <img
              src="/more.svg"
              alt="more-icon"
              className="w-4 h-4 hover:scale-90"
            />
            {toggleMore && (
              <div
                className="absolute top-10 right-0 bg-white shadow-2xl rounded-md"
                style={{ zIndex: "100" }}
              >
                <div className="grid w-full gap-1 p-2 sm:w-48">
                  <div
                    onClick={handleEditOption}
                    className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-gray-500 transition-all duration-75 hover:bg-gray-100"
                  >
                    <div className="flex items-center justify-start space-x-2">
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
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      <p className="text-sm">Edit</p>
                    </div>
                  </div>
                  <div
                    onClick={handleDeleteOption}
                    className="group flex w-full items-center justify-between rounded-md p-2 text-left text-sm font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
                  >
                    <div className="flex items-center justify-start space-x-2">
                      <svg
                        fill="none"
                        height="24"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                      </svg>

                      <p className="text-sm">Delete</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
      <Dialog
        title="Are you sure, you want to delete?"
        cancelText="Cancel"
        submitText="Delete"
        isLoading={isDeleting}
        open={deleteDialog}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleCancel={handleClose}
      />
    </div>
  );
};
