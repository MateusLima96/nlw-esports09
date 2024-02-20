import { InputHTMLAttributes } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

// Update InputProps to include a generic type parameter for the field names
interface InputProps<TFieldValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<TFieldValues>;
    name: Path<TFieldValues>; // Use Path<TFieldValues> to ensure name is a valid key
}

// The Input component remains the same
export function Input<TFieldValues extends FieldValues>(props: InputProps<TFieldValues>) {
    return (
        <input
            {...props.register(props.name)}
            {...props}
            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500' />
    );
}