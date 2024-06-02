import React, { useEffect, useState } from 'react';
import { Button, RadioButton } from '../../components';
import { ISettlement } from '../Proposer';
import { IRadioElement } from '../../components/RadioButton';
import { updateSettlementStatus } from '../../adapters';
import { SuccessIllustration, WaitingIllustration } from '../../assets';

const Negotiator: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [settlement, setSettlement] = useState<ISettlement | null>(null);
    const [selectedChoice, setSelectedChoice] = useState<string>('');
    const isDisabled = (settlement && settlement.status !== 'PENDING') || !selectedChoice || false;
    const radioElements: IRadioElement[] = [
        { id: 'radio-1', value: 'AGREE', label: 'Agree' },
        { id: 'radio-2', value: 'DISPUTE', label: 'Dispute' }
    ];

    useEffect(() => {
        const ws = new WebSocket('ws:localhost:8080');

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            setSettlement(message);
            setSelectedChoice('');
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    const onSubmit = async () => {
        if (selectedChoice) {
            try {
                setLoading(true);
                const response = await updateSettlementStatus(selectedChoice);
                if (response?.updatedSettlement) {
                    setSettlement(response?.updatedSettlement);
                    setLoading(false);
                }
            } catch (error) {
                console.log('Error', error);
            }
        }
    };

    const onRadioSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedChoice(e.target.value);
    };

    return (
        <div className="flex flex-col justify-between bg-slate-50 h-dvh items-center">
            <div className="flex flex-col justify-start gap-8 items-center mt-32 w-[500px]">
                {settlement && settlement.status !== 'AGREE' && (
                    <div className="flex gap-1 justify-center text-2xl mb-4 w-full">
                        Current Proposed settlement Amount -
                        <p className="font-bold text-emerald-800">{settlement?.settlementAmount}</p>
                    </div>
                )}

                {/* Display when negotiator has disputed the proposal */}
                {settlement && settlement.status === 'DISPUTE' && (
                    <>
                        <div className="flex gap-1 justify-center text-2xl font-bold">
                            Negotiator Response -<p className={`font-bold text-red-500`}>{settlement.status}</p>
                        </div>
                        <div className="flex flex-col gap-1 text-center text-xl mb-4 w-full">
                            <p>Above proposal has been Disputed as per your choice.</p>
                            <p>Please wait while the proposer comes back with a new proposal</p>
                        </div>
                    </>
                )}

                {/* Display when negotiator is yet to respond */}
                {settlement && settlement.status !== 'AGREE' && settlement.status === 'PENDING' && (
                    <div>
                        <p className="mb-6">Please select your choice for the above proposal</p>
                        <div className="flex flex-col justify-start gap-8">
                            <RadioButton elements={radioElements} onSelect={(e) => onRadioSelect(e)} />
                        </div>
                    </div>
                )}

                {/* Display negotiation settled state when negotiator agrees with the amount */}
                {settlement && settlement.status === 'AGREE' && (
                    <>
                        <img className="mb-4" src={SuccessIllustration} />
                        <p className="text-2xl font-bold text-emerald-800">Voila !!! All Settled </p>
                    </>
                )}

                {/* Display when no settlement amount has been proposed */}
                {!settlement && (
                    <>
                        <img className="mb-4" src={WaitingIllustration} />
                        <p className="text-xl font-bold text-emerald-800">
                            Please wait while a settlement amount is proposed
                        </p>
                    </>
                )}
            </div>
            {settlement && settlement.status !== 'AGREE' && settlement.status === 'PENDING' && (
                <div className="sticky bottom-16 w-[500px]">
                    <Button title="Submit" onClick={onSubmit} isDisabled={isDisabled} loading={loading} />
                </div>
            )}
        </div>
    );
};

export default Negotiator;
