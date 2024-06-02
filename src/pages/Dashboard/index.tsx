import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col w-dvw h-dvh justify-center gap-20 bg-slate-50 items-center">
            <div className="flex flex-col justify-center items-center font-semibold text-primary-text">
                <p className="text-lg mb-4">Select your party for settlement</p>
                <p>Party A is the Proposer</p>
                <p>Party B is the Negotiator</p>
            </div>
            <div className="flex justify-center items-center gap-32">
                <Button title="Party A" onClick={() => navigate('/proposer')} />
                <Button title="Party B" onClick={() => navigate('/negotiator')} />
            </div>
        </div>
    );
};

export default Dashboard;
