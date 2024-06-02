/* eslint-disable */
import { IStatus } from '../pages/Proposer';
import { get, post } from './provider';

export const fetchLatestSettlement = async (): Promise<any> => {
    try {
        const response = await get('/latest');
        return response;
    } catch (e) {
        throw e;
    }
};

export const updateSettlement = async (amount: number, statusAcknowledgement: boolean): Promise<any> => {
    try {
        const response = await post('/propose', { amount, statusAcknowledgement });
        return response;
    } catch (e) {
        throw e;
    }
};

export const updateSettlementStatus = async (status: string): Promise<any> => {
    try {
        const response = await post('/negotiator', { status });
        return response;
    } catch (e) {
        throw e;
    }
};
