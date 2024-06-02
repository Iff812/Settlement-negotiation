import React, { useEffect, useState } from 'react';
import { Alert, Button, Input, Loader } from '../../components';
import { fetchLatestSettlement, updateSettlement } from '../../adapters';
import { IError } from '../../adapters/provider';
import { SuccessIllustration } from '../../assets';

export type IStatus = 'DISMISS' | 'AGREE' | 'DISPUTE' | 'PENDING';
export interface ISettlement {
    createdAt: Date;
    settlementAmount: number;
    status: IStatus;
    updatedAt: Date;
    __v: number;
    _id: string;
}

const Proposer: React.FC = () => {
    const [settlementAmount, setSettlementAmount] = useState<number | undefined>(undefined);
    const [existingProposal, setExistingProposal] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const isDisabled =
        settlementAmount && existingProposal ? settlementAmount === existingProposal
            : settlementAmount && !existingProposal ? false : true;
    const [error, setError] = useState<string>('');
    const [status, setStatus] = useState<IStatus | null>(null);

    useEffect(() => {
        // fetch the proposal if its already submitted to the negotiating party
        fetchLatestProposal();
    }, []);

    // API call to fetch the latest active submission
    const fetchLatestProposal = async () => {
        const response = await fetchLatestSettlement();
        if (response?.proposedSettlement?.[0]) {
            const proposedSettlement = response?.proposedSettlement?.[0];
            setExistingProposal(proposedSettlement.settlementAmount);
            setStatus(proposedSettlement.status);
        } else setStatus('PENDING');
        setLoading(false);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSettlementAmount(e.currentTarget.valueAsNumber);
    };

    const onSubmit = async () => {
        // Update the new settlement amount and update the new numbers on the screen after the API responds
        if (settlementAmount) {
            try {
                const response = await updateSettlement(settlementAmount, status === 'DISPUTE');
                if (response?.new_settlement) {
                    setExistingProposal(response?.new_settlement?.settlementAmount);
                    setStatus(response?.new_settlement?.status);
                }
            } catch (error) {
                setError((error as IError).message);
            }
        }
    };

    // Display loader while the API is fetching the details
    if (loading) {
        return (
            <div className="flex h-dvh w-dvw justify-center items-center bg-slate-100">
                <Loader />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between bg-slate-50 h-dvh items-center">
            <div className="flex flex-col justify-start gap-8 items-center mt-32 w-[500px]">
                {error ? <Alert description={error} /> : null}
                <div className="flex flex-col gap-8 text-lg mb-4 text-center">
                    {/* Display Negotiator status only when negotiator submits a response */}
                    {status && status !== 'PENDING' && (
                        <div className="flex gap-1 justify-center text-2xl font-bold">
                            Negotiator Response -
                            <p className={`font-bold ${status === 'DISPUTE' ? 'text-red-500' : 'text-emerald-800'}`}>
                                {status}
                            </p>
                        </div>
                    )}
                    {/* Display negotiation settled state when negotiator agrees with the amount */}
                    {status && status === 'AGREE' && (
                        <>
                            <img className="mb-4" src={SuccessIllustration} />
                            <p className="text-2xl font-bold text-emerald-800">Voila !!! All Settled </p>
                        </>
                    )}
                    {/* Display proposed amount when submitter submits atleast one
                        proposal and when negotiator has not agreed to it */}
                    {status && status !== 'AGREE' && existingProposal && (
                        <div className=" flex gap-1 justify-center">
                            Current Proposed settlement Amount -
                            <p className="font-bold text-emerald-800">{existingProposal}</p>
                        </div>
                    )}
                    {status &&
                        status !== 'AGREE' &&
                        'Enter the settlement amount you want to propose for the negotiating party'}
                </div>
                {status && status !== 'AGREE' && (
                    <Input
                        id="settlement_input"
                        placeholder="Enter settlement amount"
                        value={settlementAmount}
                        onChange={onInputChange}
                    />
                )}
            </div>
            {status && status !== 'AGREE' && (
                <div className="sticky bottom-16 w-[500px]">
                    <Button title="Submit" onClick={onSubmit} isDisabled={isDisabled} loading={loading} />
                </div>
            )}
        </div>
    );
};

export default Proposer;
