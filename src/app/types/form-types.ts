export type InputType = "string" | "number" | "boolean" | "dropdown" | "date";

export interface BaseFormField {
    key: string; // Unique identifier for the form field
    label: string; // Label for the field
    required?: boolean; // Whether the field is required
    editable?: boolean; // Whether the field is editable
    placeholder?: string; // Placeholder text
}

// String-specific field
export interface StringFormField extends BaseFormField {
    type: "string";
    maxlength?: any; // Maximum length of the input, keeping as any to avoid ts error
}

// Number-specific field
export interface NumberFormField extends BaseFormField {
    type: "number";
}

// Boolean-specific field
export interface BooleanFormField extends BaseFormField {
    type: "boolean";
}

// Dropdown-specific field
export interface DropdownFormField extends BaseFormField {
    type: "dropdown";
    values: string[]; // List of dropdown options
}

// Date-specific field
export interface DateFormField extends BaseFormField {
    type: "date";
    formatPattern?: string; // Format pattern (e.g., YYYY-MM-DD)
    minDate: string; // Minimum allowed date
    maxDate: string; // Maximum allowed date
}

// Union type for all form fields
export type FormField =
    | StringFormField
    | NumberFormField
    | BooleanFormField
    | DropdownFormField
    | DateFormField;

// Form group containing multiple fields
export interface FormInputGroup {
    headerText?: string; // Optional header text
    columnSpan?: number; // Optional column span
    content: FormField[]; // Array of form fields
}

// Form data containing multiple form groups
export type FormInputData = FormInputGroup[];
