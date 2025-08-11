import axios, { AxiosInstance } from 'axios';
import { env } from '@/src/entrypoint/config';

export const createHttpClient = (): AxiosInstance => {
    return axios.create({
        baseURL: `http://localhost:${env.port}/api`,
        headers: {
            'Content-Type': 'application/json'
        },
        maxRedirects: 0,
        validateStatus: () => true
    });
}