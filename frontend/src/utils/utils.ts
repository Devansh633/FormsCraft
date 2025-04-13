import { supabaseClient } from "../config/supabase-client";
import { EFieldTypes } from "../store/type/field.type";
import { customAlphabet } from "nanoid";


export const formTemplates = [
    {
        id: "contact-us",
        name: "Contact Us",
        description: "Allows users to get in touch, typically used for customer inquiries or support.",
        fields: [
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
            },
            {
                id: "tel",
                type: EFieldTypes.PHONE,
                label: "Phone Number",
                required: false,
                placeholder: "123-456-7890",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Subject",
                required: true,
                placeholder: "Subject",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Message",
                required: true,
                placeholder: "Your message...",
            },
        ],
    },
    {
        id: "feedback",
        name: "Feedback",
        description: "Collects user feedback about products or services to help in improving them.",
        fields: [
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
            },
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "Rating",
                options: ["1", "2", "3", "4", "5"],
                value: "",
                required: true,
                placeholder: "Select Rating",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Feedback",
                required: true,
                placeholder: "Your feedback...",
            },
        ],
    },
    {
        id: "job-application",
        name: "Job Application",
        description: "Enables applicants to apply for a job position by submitting relevant information and documents.",
        fields: [
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
            },
            {
                id: "tel",
                type: EFieldTypes.PHONE,
                label: "Phone Number",
                required: true,
                placeholder: "123-456-7890",
            },
            {
                id: "file",
                type: EFieldTypes.FILE,
                label: "Resume",
                required: true,
                placeholder: "Upload your resume",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Cover Letter",
                required: false,
                placeholder: "Enter your cover letter",
            },
        ],
    },
    {
        id: "event-registration",
        name: "Event Registration",
        description: "Allows users to register for events, providing relevant information and preferences.",
        fields: [
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
            },
            {
                id: "tel",
                type: EFieldTypes.PHONE,
                label: "Phone Number",
                required: true,
                placeholder: "123-456-7890",
            },
            {
                id: "number",
                type: EFieldTypes.NUMBER,
                label: "Number of Tickets",
                required: true,
                placeholder: "1",
            },
            {
                id: "checkbox",
                type: EFieldTypes.CHECKBOX,
                label: "Dietary Preferences",
                options: ["Vegetarian", "Vegan", "Gluten-free"],
                value: [],
                required: false,
            },
        ],
    },
    {
        id: "survey",
        name: "Customer Survey",
        description: "Collects customer opinions and feedback on services or products for analysis and improvements.",
        fields: [
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "How satisfied are you with our service?",
                options: [
                    "Very Satisfied",
                    "Satisfied",
                    "Neutral",
                    "Dissatisfied",
                    "Very Dissatisfied",
                ],
                value: "",
                required: true,
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Comments",
                required: false,
                placeholder: "Additional comments...",
            },
        ],
    },
    {
        id: "order-form",
        name: "Product Order Form",
        description: "Enables customers to place orders for products, providing necessary details for shipping and billing.",
        fields: [
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Full Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "email",
                type: EFieldTypes.EMAIL,
                label: "Email",
                required: true,
                placeholder: "name@example.com",
            },
            {
                id: "tel",
                type: EFieldTypes.PHONE,
                label: "Phone Number",
                required: true,
                placeholder: "123-456-7890",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Shipping Address",
                required: true,
                placeholder: "Your shipping address",
            },
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "Product",
                options: ["Product 1", "Product 2", "Product 3"],
                value: "",
                required: true,
            },
            {
                id: "number",
                type: EFieldTypes.NUMBER,
                label: "Quantity",
                required: true,
                placeholder: "1",
            },
        ],
    },
    {
        id: "newsletter",
        name: "Newsletter Subscription",
        description: "Allows users to subscribe to a newsletter by entering their email address.",
        fields: [
            {
                id: "email",
                type: EFieldTypes.EMAIL,
                label: "Email",
                required: true,
                placeholder: "name@example.com",
            },
        ],
    },
    {
        id: "quiz",
        name: "Quiz Form",
        description: "Allows users to participate in a quiz, answering questions from a set of options.",
        fields: [
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
            },
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "Question 1",
                options: ["Option 1", "Option 2", "Option 3"],
                value: "",
                required: true,
            },
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "Question 2",
                options: ["Option 1", "Option 2", "Option 3"],
                value: "",
                required: true,
            },
            {
                id: "dropdown",
                type: EFieldTypes.DROPDOWN,
                label: "Question 3",
                options: ["Option 1", "Option 2", "Option 3"],
                value: "",
                required: true,
            },
        ],
    },
    {
        id: "support-ticket",
        name: "Support Ticket",
        description: "Enables users to raise support tickets for issues they are facing, typically used in customer support scenarios.",
        fields: [
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
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Issue",
                required: true,
                placeholder: "Describe your issue",
            },
        ],
    },
    {
        id: "booking-form",
        name: "Appointment Booking",
        description: "Allows users to book an appointment by choosing a date and providing contact information.",
        fields: [
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
            },
            {
                id: "tel",
                type: EFieldTypes.PHONE,
                label: "Phone Number",
                required: true,
                placeholder: "123-456-7890",
            },
            {
                id: "date",
                type: EFieldTypes.DATE,
                label: "Date",
                required: true,
                placeholder: "Select a date",
            },
            {
                id: "text",
                type: EFieldTypes.TEXT,
                label: "Message",
                required: false,
                placeholder: "Additional info",
            },
        ],
    },
    {
        id: "donation-form",
        name: "Donation Form",
        description: "Allows users to make donations to a cause or organization.",
        fields: [
            {
                id: "name",
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
            },
            {
                id: "amount",
                type: EFieldTypes.NUMBER,
                label: "Donation Amount",
                required: true,
                placeholder: "Amount",
            }
        ]
    },
    {
        id: "membership-form",
        name: "Membership Form",
        description: "Allows users to apply for membership in a club or organization.",
        fields: [
            {
                id: "name",
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
            },
            {
                id: "membership_type",
                type: EFieldTypes.DROPDOWN,
                label: "Membership Type",
                options: ["Basic", "Premium", "VIP"],
                required: true,
                placeholder: "Select Membership Type",
            }
        ]
    },
    {
        id: "event-feedback",
        name: "Event Feedback Form",
        description: "Allows participants to provide feedback after an event.",
        fields: [
            {
                id: "rating",
                type: EFieldTypes.DROPDOWN,
                label: "Overall Rating",
                options: ["1", "2", "3", "4", "5"],
                required: true,
                placeholder: "Select Rating",
            },
            {
                id: "comments",
                type: EFieldTypes.TEXT,
                label: "Additional Comments",
                required: false,
                placeholder: "Enter comments",
            }
        ]
    },
    {
        id: "interview-schedule",
        name: "Interview Schedule Form",
        description: "Schedule an interview for a job position.",
        fields: [
            {
                id: "name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "position",
                type: EFieldTypes.TEXT,
                label: "Position",
                required: true,
                placeholder: "Position",
            },
            {
                id: "date",
                type: EFieldTypes.DATE,
                label: "Preferred Date",
                required: true,
                placeholder: "Select Date",
            }
        ]
    },
    {
        id: "service-request",
        name: "Service Request Form",
        description: "Allow customers to request a service or support.",
        fields: [
            {
                id: "name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "service_type",
                type: EFieldTypes.DROPDOWN,
                label: "Type of Service",
                options: ["Repair", "Installation", "General Inquiry"],
                required: true,
                placeholder: "Select Type",
            },
            {
                id: "details",
                type: EFieldTypes.TEXT,
                label: "Details",
                required: true,
                placeholder: "Enter details",
            }
        ]
    },
    {
        id: "appointment-reschedule",
        name: "Appointment Reschedule Form",
        description: "Allow users to reschedule an existing appointment.",
        fields: [
            {
                id: "appointment_id",
                type: EFieldTypes.NUMBER,
                label: "Appointment ID",
                required: true,
                placeholder: "Enter Appointment ID",
            },
            {
                id: "new_date",
                type: EFieldTypes.DATE,
                label: "New Date",
                required: true,
                placeholder: "Select New Date",
            }
        ]
    },
    {
        id: "course-enrollment",
        name: "Course Enrollment Form",
        description: "Allow students to enroll in a course.",
        fields: [
            {
                id: "name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "course",
                type: EFieldTypes.DROPDOWN,
                label: "Course",
                options: ["Math", "Physics", "Chemistry"],
                required: true,
                placeholder: "Select Course",
            }
        ]
    },
    {
        id: "asset-request",
        name: "Asset Request Form",
        description: "Allow employees to request assets or resources for their work.",
        fields: [
            {
                id: "employee_name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "asset",
                type: EFieldTypes.DROPDOWN,
                label: "Asset",
                options: ["Laptop", "Monitor", "Desk"],
                required: true,
                placeholder: "Select Asset",
            }
        ]
    },
    {
        id: "travel-booking",
        name: "Travel Booking Form",
        description: "Allow users to book travel arrangements.",
        fields: [
            {
                id: "name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "destination",
                type: EFieldTypes.TEXT,
                label: "Destination",
                required: true,
                placeholder: "Enter Destination",
            },
            {
                id: "date",
                type: EFieldTypes.DATE,
                label: "Travel Date",
                required: true,
                placeholder: "Select Date",
            }
        ]
    },
    {
        id: "bug-report",
        name: "Bug Report Form",
        description: "Allow users to report bugs or issues with a product or service.",
        fields: [
            {
                id: "name",
                type: EFieldTypes.TEXT,
                label: "Name",
                required: true,
                placeholder: "Your Name",
            },
            {
                id: "issue",
                type: EFieldTypes.TEXT,
                label: "Issue",
                required: true,
                placeholder: "Describe the issue",
            },
            {
                id: "screenshot",
                type: EFieldTypes.FILE,
                label: "Screenshot (optional)",
                required: false,
                placeholder: "Upload Screenshot",
            }
        ]
    }
];

const nanoid = customAlphabet(
    "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    10
);

export const getFormId = async () => {
    let newFormId = nanoid(10);
    while (true) {
        const { data, error } = await supabaseClient
            .from("forms")
            .select("form_id")
            .eq("form_id", newFormId);
        if (!data || !data?.length) break;
        newFormId = nanoid(10);
    }
    return newFormId
}

export const updateAIFormData = (data: any) => {
    const updatedFields = [];
    let copyFields = structuredClone(data?.fields);
    for (let i = 0; i < copyFields?.length; i++) {
        if (
            copyFields[i].type === EFieldTypes.DROPDOWN ||
            copyFields[i].type === EFieldTypes.CHECKBOX
        ) {
            copyFields[i].options = copyFields[i].options.split(/\s*,\s*/);
            if (copyFields[i].type === EFieldTypes.DROPDOWN) {
                copyFields[i].value = "";
            } else {
                copyFields[i].value = [];
                if (copyFields[i]?.options?.length === 0) {
                    copyFields[i].options.push(["Agree"]);
                } else if (
                    copyFields[i]?.options?.length === 1 &&
                    copyFields[i]?.options?.[0]?.length === 0
                ) {
                    copyFields[i].options[0] = "Agree";
                }
            }
        }
        updatedFields.push(copyFields[i]);
    }
    data.fields = updatedFields;
    // console.log({ data })
    return data
}

export const getDataFromContent = (content: string) => {
    let startIndex = null;
    let braceCount = 0;

    for (let i = 0; i < content.length; i++) {
        if (content[i] === '{') {
            if (braceCount === 0) {
                startIndex = i;
            }
            braceCount++;
        } else if (content[i] === '}') {
            braceCount--;
            if (braceCount === 0 && startIndex !== null) {
                const formDataString = content.substring(startIndex, i + 1);
                return formDataString
            }
        }
    }
    return content
}

export const isTypeInEnum = (type: string): boolean => {

    switch (type) {
        case EFieldTypes.TEXT:
        case EFieldTypes.EMAIL:
        case EFieldTypes.SEARCH:
        case EFieldTypes.URL:
        case EFieldTypes.NUMBER:
        case EFieldTypes.PHONE:
        case EFieldTypes.DATE:
        case EFieldTypes.CHECKBOX:
        case EFieldTypes.DROPDOWN:
        case EFieldTypes.FILE:
            return true
        default:
            return false
    }

};