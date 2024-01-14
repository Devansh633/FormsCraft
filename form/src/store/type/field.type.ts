export interface Form {
    id: string;
    name: string;
    user_id: string;
    fields: IFormField[];
}

export interface IOption {
    value: string;
    label: string;
}

export interface IFormField {
    id: string;
    form_id: string;
    name: string;
    label: string;
    type: EFieldTypes;
    placeholder?: string;
    options?: IOption[];
    required: boolean;
    order: number;
}

export enum EFieldTypes {
    TEXT = 'text',
    EMAIL = 'email',
    URL = 'url',
    TEXTAREA = 'textarea',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    SELECT = 'select',
    DROPDOWN = 'dropdown',
    DATE = 'date',
    FILE = 'file',
    NUMBER = 'number',
    SEARCH = 'search',
    PHONE = 'tel'
}

export interface IFormSubmission {
    id: string;
    form_id: string;
    responses: IFormResponse[];
}

export interface IFormResponse {
    id: string;
    submission_id: string;
    field_id: string;
    value: string;
}