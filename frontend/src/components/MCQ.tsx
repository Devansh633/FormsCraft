import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Button } from "./ui/Button";
import { FileUpload } from "./FileUpload";
import { useNavigate } from "react-router-dom";
import { EFieldTypes } from "../store/type/field.type";

// Define the structure of the input options
interface InputOptions {
    a: string;
    b: string;
    c: string;
    d: string;
}

// Define the structure of the input object
interface InputObject {
    bloom_taxonomy: string;
    correct: string;
    number: string;
    options: InputOptions;
    question: string;
    type: string;
}

// Define the structure of the output object
interface OutputObject {
    id: string;
    type: string;
    label: string;
    options: string[];
    value: string;
    required: boolean;
    correct:string;
}

export const MCQ = () => {
    const navigate = useNavigate();
    const [mcqs, setMcqs] = useState<InputObject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const convertToDropdownFormat = (inputArray: InputObject[]): OutputObject[] => {
        return inputArray.map((item, index) => {
            const options = Object.keys(item.options).map(key => item.options[key as keyof InputOptions]);

            return {
                id: `dropdown_${index + 1}`,
                type: EFieldTypes.DROPDOWN,
                label: item.question,
                options: options,
                value: "",
                required: true,
                correct: item.options[item.correct as keyof InputOptions]
            };
        });
    };

    const handleFileUpload = (data: InputObject[]) => {
        setMcqs(data);
        const dropdownArray = convertToDropdownFormat(data);
        const fields = [
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "email",
                type: EFieldTypes.EMAIL,
                label: "Email",
                required: true,
                placeholder: "name@example.com",
            }]
            const updatedFields = [...fields, ...dropdownArray];
            console.log(updatedFields);
            const id = "quiz";
            navigate(`/templates/${id}/edit`, { state: { fields: updatedFields } });
    };

    useEffect(() => {
        setLoading(false);
        console.log(mcqs);
    }, [mcqs]);

    return (
        <div>
            <Navbar />
            <div className="w-full bg-white border-b py-8 px-4 md:px-16 lg:px-32 space-y-8">
                <div className="flex justify-between items-center">
                    <p className="text-xl">MCQ Generator</p>
                    <div>
                        <FileUpload onFileUpload={handleFileUpload} />
                    </div>
                </div>
            </div>
        </div>
    );
};
