import React from 'react';
import Loader from './Loader';

interface ICustomButton {
    title: string;
    onClick: () => void;
    isDisabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ICustomButton> = ({ title, onClick, isDisabled = false, loading = false }) => {
    return (
        <div
            className={`px-6 py-4 rounded-xl font-semibold text-center
            ${ isDisabled ? 'bg-gray-300 cursor-not-allowed text-gray-500' :
            'bg-lime-500 cursor-pointer transform transition duration-500 hover:scale-125 text-emerald-800'}`}
            onClick={onClick}
        >
            {loading ? (
                <div className='max-h-6'>
                    <Loader />
                </div>
            ) : title}
        </div>
    );
};

export default Button;
