import React from 'react';

export interface IRadioElement {
    id: string;
    value: string;
    label: string;
}

interface IRadioButton {
    elements: IRadioElement[];
    onSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<IRadioButton> = ({ elements, onSelect }) => {
    return (
        <>
            {elements.map((element) => (
                <div key={element.id} className="flex items-center">
                    <input
                        id={element.id}
                        type="radio"
                        value={element.value}
                        name="default-radio"
                        className="w-6 h-6 border-gray-300 accent-emerald-800"
                        onChange={onSelect}
                    />
                    <label htmlFor="default-radio-1" className="ms-2 text-lg font-semibold text-gray-700">
                        {element.label}
                    </label>
                </div>
            ))}
        </>
    );
};

export default RadioButton;
