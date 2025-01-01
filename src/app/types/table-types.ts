// For Table Header Definition
export interface TableHeader {
    name: string; // Name of the header column (e.g., 'Class', 'Width CM')
    minWidth?: string; // Minimum width of the column
}

// For Table Row Data (Field Value)
export interface TableRow {
    [key: string]: any;
}

// For Table Keys (Configuration of Fields)
export interface TableKey {
    name: string; // Name of the field (key in row data)
    type?: "string" | "number" | "decimal" | "boolean" | "dropdown"; // Type of the value for the field
    editable?: boolean; // Whether the field is editable
    defaultEmpty?: boolean; // Optional: for dropdowns, allows a default "--select--" value
    values?: string[]; // Optional: for dropdown fields, list of possible values to select from
    placeholder?: string; // Optional: placeholder for input fields
    min?: number; // Optional : min value for number fields
    step?: number; // Optional : increment/decrement offset for number values
}
