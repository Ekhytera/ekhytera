import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions
}

function Input({ name, type, placeholder, register, rules, error }: InputProps) {

    return (
        <>
            <input
                type={type}
                autoComplete={type}
                placeholder={placeholder}
                {...register(name, rules)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
            />
            {
                error && <p className="text-red-600">* {error}</p>
            }
        </>
    )
}

export default Input