import { AxiosResponse } from "axios";
import { createHttpClient } from "@/tests/integration/utils";

export const createMatchScenario = async (accessToken: string): Promise<AxiosResponse> => {
    const httpClient = createHttpClient(accessToken);

    return await httpClient.post('/match');
}