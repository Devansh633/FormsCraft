import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { Button } from "./ui/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RenderFields } from "./RenderFields";
import { EFieldTypes } from "../store/type/field.type";
import { RenderForm } from "./RenderForm";
import { useBackdrop } from "../hooks/Backdrop";
import LoadingSpinner from "./ui/LoadingSpinner";
import { supabaseClient } from "../config/supabase-client";
import { useAuth } from "../hooks/Auth";
import { useToast } from "../hooks/Toast";
import { Dialog } from "./ui/Dialog";

const fieldItems = [
  {
    id: "text",
    type: EFieldTypes.TEXT,
    label: "Text Input",
    required: true,
    placeholder: "Placeholder",
  },
  {
    id: "email",
    type: EFieldTypes.EMAIL,
    label: "Email",
    required: true,
    placeholder: "example@email.com",
  },
  {
    id: "url",
    type: EFieldTypes.URL,
    label: "Link",
    required: true,
    placeholder: "https://example.com",
  },
  {
    id: "number",
    type: EFieldTypes.NUMBER,
    label: "Number",
    required: true,
    placeholder: "Enter number",
  },
  {
    id: "tel",
    type: EFieldTypes.PHONE,
    label: "Phone Number",
    required: true,
    placeholder: "9876543210",
  },
  {
    id: "checkbox",
    type: EFieldTypes.CHECKBOX,
    label: "Checkbox",
    options: ["Option 1", "Option 2"],
    value: [],
    required: true,
    placeholder: "",
  },
  {
    id: "dropdown",
    type: EFieldTypes.DROPDOWN,
    label: "Dropdown",
    options: ["Option 1", "Option 2"],
    value: "",
    required: true,
    placeholder: "Select option",
  },
  {
    id: "file",
    type: EFieldTypes.FILE,
    label: "File",
    required: true,
    placeholder: "File",
  },
  {
    id: "date",
    type: EFieldTypes.DATE,
    label: "Date",
    required: true,
    placeholder: "Date",
  },
];

export const CreateForm = ({
  id = "",
  fields = [],
  name = "",
}: {
  id: string;
  fields: any[];
  name: string;
}) => {
  const { showLoader, hideLoader } = useBackdrop();
  const popoverRef = useRef<any>(null);
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [rightItems, setRightItems] = useState<any[]>(fields);
  const [toggleFields, setToggleFields] = useState<any[]>([fieldItems[0]]);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [togglePopup, setTogglePopup] = useState<boolean>(false);
  const [togglePreview, setTogglePreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(name);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleOnDragEnd = (result: any) => {
    const { source, destination } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // Reordering within the same list
    if (destination.droppableId === "right") {
      // Right list reordering
      const itemsCopy = Array.from(rightItems);
      if (result?.draggableId?.includes?.("left")) {
        itemsCopy.splice(destination?.index, 0, fieldItems?.[source?.index]);
      } else {
        const [reorderedItem] = itemsCopy.splice(source.index, 1);
        itemsCopy.splice(destination.index, 0, reorderedItem);
      }
      setRightItems(itemsCopy);
    }
  };

  const handleAddField = (item: any) => {
    const itemCopy = structuredClone(item);
    setRightItems((prv) => [...prv, itemCopy]);
    setTogglePopup(false);

    setTimeout(() => {
      const id = `${item.id}-${rightItems?.length}`;
      const newField = document.getElementById(id);
      newField?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handleToggleFields = (item: any) => {
    const updatedToggleFields = [...toggleFields];
    let idx = -1;
    for (let i = 0; i < updatedToggleFields.length; i++) {
      if (item?.type === updatedToggleFields[i]?.type) {
        idx = i;
        break;
      }
    }
    if (idx >= 0) {
      updatedToggleFields.splice(idx, 1);
    } else {
      updatedToggleFields.push(item);
    }
    setToggleFields(updatedToggleFields);
  };

  const handleDropDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropDown((prv) => !prv);
  };

  const handleDraft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropDown(false);
    if (rightItems?.length === 0) return;
    handleSubmit(false);
  };

  const handleEditLabel = (
    // e: React.FormEvent<HTMLInputElement>,
    e: any,
    index: number
  ) => {
    let updatedRightItems = [...rightItems];
    updatedRightItems[index] = {
      ...updatedRightItems[index],
      label: e.currentTarget.value,
    };
    setRightItems(updatedRightItems);
  };

  const handleEditPlaceholder = (e: any, index: number) => {
    let updatedRightItems = [...rightItems];
    updatedRightItems[index] = {
      ...updatedRightItems[index],
      placeholder: e.currentTarget.value,
    };
    setRightItems(updatedRightItems);
  };

  const handleRequired = (index: number) => {
    let updatedRightItems = structuredClone(rightItems);
    updatedRightItems[index].required = !updatedRightItems[index].required;
    setRightItems(updatedRightItems);
  };

  const handleDelete = (index: number) => {
    let updatedRightItems = [...rightItems];
    updatedRightItems.splice(index, 1);
    setRightItems(updatedRightItems);
  };

  const handleEditOption = (e: any, index: number, optionIndex: number) => {
    let updatedRightItems = [...rightItems];
    let type = updatedRightItems?.[index]?.type;
    if (type === EFieldTypes.CHECKBOX || type === EFieldTypes.DROPDOWN) {
      updatedRightItems[index].options[optionIndex] = e.target.value;
      setRightItems(updatedRightItems);
    }
  };

  const handleAddOption = (index: number) => {
    let updatedRightItems = [...rightItems];
    let type = updatedRightItems?.[index]?.type;
    if (type === EFieldTypes.CHECKBOX || type === EFieldTypes.DROPDOWN) {
      let options = updatedRightItems[index].options;
      options.push(`Option ${options.length + 1}`);
      updatedRightItems[index].options = options;
      setRightItems(updatedRightItems);
    }
  };

  const handleDeleteOption = (index: number, optionIndex: number) => {
    let updatedRightItems = [...rightItems];
    let type = updatedRightItems?.[index]?.type;
    if (type === EFieldTypes.CHECKBOX || type === EFieldTypes.DROPDOWN) {
      updatedRightItems[index].options.splice(optionIndex, 1);
      setRightItems(updatedRightItems);
    }
  };

  const handleTogglePreview = () => {
    setTogglePreview((prv) => !prv);
  };

  const handleSubmit = async (publish: boolean = false) => {
    for (let i = 0; i < rightItems?.length; i++) {
      const item = rightItems[i];
      if (item?.label?.length === 0) {
        return showToast("Label cannot be empty", "Please enter a label");
      }
      if (
        item?.type === EFieldTypes.CHECKBOX ||
        item?.type === EFieldTypes.DROPDOWN
      ) {
        for (let j = 0; j < item?.options?.length; j++) {
          if (item?.options[j]?.length === 0) {
            return showToast("Option cannot be empty", "Please enter a option");
          }
        }
      }
    }
    showLoader();
    const { data: findData, error: findError } = await supabaseClient
      .from("forms")
      .select("form_id")
      .eq("form_id", id);
    if (findError) return;
    if (findData?.length === 0) {
      const { data, error } = await supabaseClient.from("forms").insert({
        user_id: user?.id,
        fields: rightItems,
        name: title,
        published: publish,
        form_id: id,
      });
      hideLoader();
      if (!error) {
        navigate("/dashboard");
      }
    } else {
      console.log(rightItems,title, publish);
      const { data, error } = await supabaseClient
        .from("forms")
        .update({
          fields: rightItems,
          name: title,
          published: publish,
        })
        .eq("user_id", user?.id)
        .eq("form_id", id);
      hideLoader();
      if (!error) {
        navigate("/dashboard");
      }
    }
  };

  const deepEqual = (obj1: any, obj2: any) => {
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

  const areArraysEqual = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = 0; i < arr1.length; i++) {
      if (!deepEqual(arr1[i], arr2[i])) {
        return false;
      }
    }

    return true;
  };

  const handleBack = () => {
    if (!areArraysEqual(fields, rightItems) || name != title) {
      return setDialog(true);
    }
    navigate("/dashboard");
  };

  const handleDialogSubmit = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        popoverRef?.current &&
        !popoverRef?.current?.contains?.(event.target)
      ) {
        setDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return togglePreview ? (
    <div>
      <RenderForm
        preview={true}
        fields={rightItems}
        title={title}
        handleClose={handleTogglePreview}
      />
    </div>
  ) : (
    <div className="md:grid md:grid-cols-6 lg:grid-cols-5 min-h-screen">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="hidden md:block col-span-2 lg:col-span-1 max-w-[500px] left-panel h-100 max-h-screen overflow-y-auto bg-white border-r-2">
          <div
            className="sticky top-0 bg-white px-4 py-8 border-b-2"
            style={{ zIndex: "100" }}
          >
            <Label text="Search Fields" htmlFor="searchFields" />
            <Input
              type={EFieldTypes.SEARCH}
              placeholder="Search Fields"
              id="searchFields"
              name="searchFields"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          <div className="p-4 space-y-4">
            <StrictModeDroppable droppableId="left">
              {(provided) => (
                <div
                  className="space-y-4"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fieldItems?.map?.((item: any, index: number) => {
                    if (
                      item?.type
                        ?.toLowerCase?.()
                        ?.includes?.(search?.toLowerCase?.()) ||
                      item?.label
                        ?.toLowerCase?.()
                        ?.includes?.(search?.toLowerCase?.())
                    ) {
                      return (
                        <Draggable
                          key={`${item.id}-${index}-left`}
                          draggableId={`${item.id}-${index}-left`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              id={`${item.id}-${index}`}
                            >
                              <div key={index}>
                                <div
                                  className={`${
                                    toggleFields?.includes?.(item)
                                      ? "shadow"
                                      : "shadow-sm"
                                  } w-full flex space-x-4 bg-gray-100 p-2 rounded-md cursor-pointer hover:shadow text-sm font-semibold text-gray-600`}
                                  onClick={() => handleToggleFields(item)}
                                >
                                  {toggleFields?.includes?.(item) ? (
                                    <svg
                                      className="w-5 h-5"
                                      width="24px"
                                      height="24px"
                                      strokeWidth="1.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="#000000"
                                    >
                                      <path
                                        d="M6 15l6-6 6 6"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-5 h-5"
                                      width="24px"
                                      height="24px"
                                      strokeWidth="1.5"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      color="#000000"
                                    >
                                      <path
                                        d="M6 9l6 6 6-6"
                                        stroke="#000000"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      ></path>
                                    </svg>
                                  )}

                                  <p>{item.label}</p>
                                </div>
                                {toggleFields?.includes?.(item) && (
                                  <div className="relative bg-gray-100 mt-1 p-4 rounded-md shadow text-sm font-semibold text-gray-600">
                                    <RenderFields item={item} preview={true} />
                                    <div className="w-40 mt-2">
                                      <button
                                        onClick={() => handleAddField(item)}
                                        className="text-xs border px-2 py-1 rounded-md shadow-sm bg-[#FF725E] text-white"
                                      >
                                        Add Field
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    } else return null;
                  })}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>
        <div className="col-span-4 h-100 max-h-screen h-screen overflow-y-auto">
          <div className="mt-2 px-4 md:px-8 py-6 w-100 flex justify-between items-center">
            <div>
              <img
                onClick={handleBack}
                src="/arrow-left.svg"
                alt="arrow-left-icon"
                className="w-5 h-5 cursor-pointer transition-all duration-75 active:scale-90"
              />
            </div>
            <div className="flex items-center space-x-6">
              <button
                disabled={rightItems?.length === 0}
                onClick={handleTogglePreview}
                className={`${
                  rightItems?.length === 0
                    ? "opacity-80 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }
                flex items-center space-x-2 bg-gray-100 border shadow-md px-4 py-2 rounded-md text-sm font-semibold transition-all duration-75 active:scale-95`}
              >
                <svg
                  className="w-4 h-4"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.16666 6.99996C1.16666 6.99996 2.91666 2.91663 6.99999 2.91663C11.0833 2.91663 12.8333 6.99996 12.8333 6.99996C12.8333 6.99996 11.0833 11.0833 6.99999 11.0833C2.91666 11.0833 1.16666 6.99996 1.16666 6.99996Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Preview</p>
              </button>
              <button
                onClick={() => handleSubmit(true)}
                ref={popoverRef}
                disabled={rightItems?.length === 0}
                className={`${
                  rightItems?.length === 0
                    ? "opacity-80 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                } relative flex justify-between items-center space-x-4 bg-[#FF725E] text-white shadow-md px-4 py-2 rounded-md text-sm font-semibold`}
              >
                <div className="flex items-center space-x-2">
                  <img src="/send.svg" alt="publish-icon" className="w-4 h-4" />
                  <p>Publish</p>
                </div>
                <div
                  className="hover:bg-gray-600 rounded transition-all duration-75 active:scale-95"
                  onClick={handleDropDown}
                >
                  {dropDown ? (
                    <svg
                      className="w-5 h-5"
                      width="24px"
                      height="24px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#fff"
                    >
                      <path
                        d="M6 15l6-6 6 6"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      width="24px"
                      height="24px"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#fff"
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </div>
                {dropDown && (
                  <div className="absolute top-10 right-0 bg-white w-[140px] px-4 py-2 rounded shadow-md hover:bg-gray-100 transition-all duration-75 active:scale-95">
                    <p
                      onClick={handleDraft}
                      className="text-sm font-semibold text-gray-800"
                    >
                      Save as draft
                    </p>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="px-8 md:px-16 lg:px-32 py-10 lg:py-6">
            <input
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              placeholder="Form title"
              type="text"
              className="text-4xl font-bold outline-none w-full bg-transparent mb-6"
            />

            <StrictModeDroppable droppableId="right">
              {(provided) => (
                <div
                  // className="space-y-4"
                  className={`${
                    rightItems?.length > 0
                      ? "space-y-4"
                      : "space-y-4 flex justify-center items-center text-gray-500 p-6 rounded-md border-2 border-gray-400 border-dotted w-80"
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {rightItems.map((item: any, index) => (
                    <div key={index} className="max-w-[300px] lg:max-w-[350px]">
                      <Draggable
                        key={`${item.id}-${index}-right`}
                        draggableId={`${item.id}-${index}-right`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            id={`${item.id}-${index}`}
                          >
                            <RenderFields
                              item={item}
                              index={index}
                              handleDelete={handleDelete}
                              handleEditLabel={handleEditLabel}
                              handleEditPlaceholder={handleEditPlaceholder}
                              handleEditOption={handleEditOption}
                              handleAddOption={handleAddOption}
                              handleDeleteOption={handleDeleteOption}
                              handleRequired={handleRequired}
                            />
                          </div>
                        )}
                      </Draggable>
                    </div>
                  ))}
                  {provided.placeholder}
                  {rightItems?.length === 0 && (
                    <div>
                      <div className="hidden md:block">Drag here</div>
                      <div className="md:hidden">Add here</div>
                    </div>
                  )}
                </div>
              )}
            </StrictModeDroppable>

            <button
              onClick={() => setTogglePopup(true)}
              className="block md:hidden mt-6 px-4 py-2 text-sm text-gray-600 font-semibold rounded-md border border-gray-500 transition-all duration-75 active:scale-95"
            >
              Add Field
            </button>

            {rightItems?.length > 0 && (
              <div className="w-32 mt-8">
                <Button text="Submit" />
              </div>
            )}
          </div>
        </div>

        <div
          className={`
           ${togglePopup ? "visible" : "invisible"}
           fixed top-0 left-0 w-full h-full shadow-md bg-gray-50 overflow-y-auto left-panel transition-all duration-300 md:hidden
         `}
          style={togglePopup ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="bg-white flex justify-end items-center w-full px-4 py-4">
            <button
              type="button"
              className="rounded-md p-1 text-foreground/50 opacity-100 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
              toast-close=""
              data-radix-toast-announce-exclude=""
              onClick={() => setTogglePopup(false)}
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
          <div
            className="sticky top-0 bg-white px-4 pb-6 border-b-2"
            style={{ zIndex: "100" }}
          >
            <Label text="Search Fields" htmlFor="searchFields" />
            <Input
              type={EFieldTypes.SEARCH}
              placeholder="Search Fields"
              id="searchFields"
              name="searchFields"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
          <div className="p-4 space-y-4">
            {fieldItems?.map?.((item: any, index: number) => {
              if (
                item?.type
                  ?.toLowerCase?.()
                  ?.includes?.(search?.toLowerCase?.()) ||
                item?.label
                  ?.toLowerCase?.()
                  ?.includes?.(search?.toLowerCase?.())
              ) {
                return (
                  <div key={index}>
                    <button
                      className={`${
                        toggleFields?.includes?.(item) ? "shadow" : "shadow-sm"
                      } w-full flex space-x-4 bg-gray-100 p-2 rounded-md cursor-pointer hover:shadow text-sm font-semibold text-gray-600`}
                      onClick={() => handleToggleFields(item)}
                    >
                      {toggleFields?.includes?.(item) ? (
                        <svg
                          className="w-5 h-5"
                          width="24px"
                          height="24px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M6 15l6-6 6 6"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          width="24px"
                          height="24px"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          color="#000000"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      )}

                      <p>{item.label}</p>
                    </button>
                    {toggleFields?.includes?.(item) && (
                      <div className="relative bg-gray-100 mt-1 p-4 rounded-md shadow text-sm font-semibold text-gray-600">
                        <RenderFields item={item} preview={true} />

                        <div className="w-40 mt-2">
                          <button
                            onClick={() => handleAddField(item)}
                            className="text-xs border px-2 py-1 rounded-md shadow-sm bg-gray-900 text-white"
                          >
                            Add Field
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else return null;
            })}
          </div>
        </div>
      </DragDropContext>
      <Dialog
        open={dialog}
        cancelText="No"
        submitText="Leave"
        title="Changes you made may not be saved. You want to leave?"
        handleClose={() => setDialog(false)}
        handleSubmit={handleDialogSubmit}
        handleCancel={() => setDialog(false)}
      />
    </div>
  );
};
