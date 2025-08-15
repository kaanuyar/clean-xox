import axios, { AxiosInstance } from 'axios';
import { env } from '@/src/entrypoint/config';

export const createHttpClient = (accessToken?: string): AxiosInstance => {
    const headers = new axios.AxiosHeaders({
        'Content-Type': 'application/json'
    });

    if (accessToken) {
        headers.setAuthorization(`Bearer ${accessToken}`);
    }
    
    return axios.create({
        baseURL: `http://localhost:${env.port}/api`,
        headers: headers,
        maxRedirects: 0,
        validateStatus: () => true
    });
}