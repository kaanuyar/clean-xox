import { AxiosResponse } from "axios";
import { JoinMatchRequest } from "@/src/presentation/contracts";
import { createHttpClient } from "@/tests/integration/utils";

export const joinMatchScenario = async (request: JoinMatchRequest, accessToken: string): Promise<AxiosResponse> => {
    const httpClient = createHttpClient(accessToken);
    const { code } = request;

    return await httpClient.post(`match/${code}/join`);
}