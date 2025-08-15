import { AxiosResponse } from "axios";
import { GetMatchRequest } from "@/src/presentation/contracts";
import { createHttpClient } from "@/tests/integration/utils";

export const getMatchScenario = async (request: GetMatchRequest, accessToken: string): Promise<AxiosResponse> => {
    const httpClient = createHttpClient(accessToken);
    const { code } = request;

    return await httpClient.get(`match/${code}`);
}