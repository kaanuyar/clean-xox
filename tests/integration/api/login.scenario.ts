import { AxiosResponse } from "axios";
import { LoginRequest } from "@/src/presentation/contracts";
import { createHttpClient } from "@/tests/integration/utils";

export const loginScenario = async (request: Partial<LoginRequest> = {}): Promise<AxiosResponse> => {
    const httpClient = createHttpClient();
    const defaultRequest: LoginRequest = {
        email: 'ben@miyim.com',
        password: 'evet'
    };

    const loginRequest = { ...defaultRequest, ...request };

    return await httpClient.post('/login', loginRequest);
}