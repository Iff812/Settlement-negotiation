/* eslint-disable */
export interface IError {
    message: string;
}

type IMethod = 'DELETE' | 'PUT' | 'POST' | 'GET';

export const getContentType = (res: any): string => {
    const isJSON = res.headers.get('Content-Type')?.startsWith('application/json') || false;

    if (isJSON) {
        return 'JSON';
    }

    const isText = res.headers.get('Content-Type')?.startsWith('text') || false;
    if (isText) {
        return 'Text';
    }

    return 'Unsupported';
};

export const processResponse = async (res: any) => {
    const contentType = getContentType(res);

    if (res.ok) {
        if (contentType === 'JSON') {
            return await res.json();
        } else {
            return res;
        }
    }
};

export const accessAPI = async (
    method: IMethod,
    url: string,
    body?: Record<string, unknown>
): Promise<Record<string, unknown>> => {
    try {
        const baseUrl = 'http://localhost:3003/settlement';
        const result = await fetch(baseUrl + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (result.ok) {
            return await processResponse(result);
        } else {
            const errorMessage = (await result.json()).message;
            throw new Error(errorMessage);
        }
    } catch (e) {
        throw e;
    }
};

export const get = async (url: string): Promise<Record<string, unknown>> => {
    try {
        return await accessAPI('GET', url);
    } catch (e) {
        throw e;
    }
};

export const post = async (url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> => {
    try {
        return await accessAPI('POST', url, body);
    } catch (e) {
        throw e;
    }
};

export const put = async (url: string, body: Record<string, unknown>): Promise<Record<string, unknown>> => {
    try {
        return await accessAPI('PUT', url, body);
    } catch (e) {
        throw e;
    }
};

export const del = async (url: string): Promise<Record<string, unknown>> => {
    try {
        return await accessAPI('DELETE', url);
    } catch (e) {
        throw e;
    }
};
