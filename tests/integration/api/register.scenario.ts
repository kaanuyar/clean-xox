import { AxiosResponse } from "axios";
import { RegisterRequest } from "@/src/presentation/contracts";
import { createHttpClient } from "@/tests/integration/utils";

export const registerScenario = async (request: Partial<RegisterRequest> = {}): Promise<AxiosResponse> => {
    const httpClient = createHttpClient();
    const defaultRequest: RegisterRequest = {
        name: 'hedef',
        email: 'ben@miyim.com',
        password: 'evet',
        passwordConfirmation: 'evet'
    };

    const registerRequest = { ...defaultRequest, ...request };

    return await httpClient.post('/register', registerRequest);
}