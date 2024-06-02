import React from 'react';

interface IInput {
    id: string;
    placeholder: string;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    value: number | undefined;
    isDisabled?: boolean;
}

const Input: React.FC<IInput> = ({ id, placeholder, onChange, value, isDisabled = false }) => {
    return (
        <input
            type="number"
            id={id}
            className={`w-full border-zinc-400 text-gray-700 text-sm rounded-xl
            py-3 px-5 placeholder:text-zinc-400 font-medium focus:outline-none focus:border-2 focus:border-emerald-800
            ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-white border'}`}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            disabled={isDisabled}
        />
    );
};

export default Input;
