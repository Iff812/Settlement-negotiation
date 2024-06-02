import React from 'react';
import { WarningIcon } from '../assets';

interface IAlert {
    description: string;
}

const Alert: React.FC<IAlert> = ({ description }) => {
    return (
        <div className="flex gap-3 bg-red-400 rounded-xl py-4 px-6 text-white font-semibold">
            <img src={WarningIcon} />
            <div>{description}</div>
        </div>
    );
};

export default Alert;
