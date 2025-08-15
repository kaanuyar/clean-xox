import { AxiosResponse } from "axios";
import { PlayMatchRequest } from "@/src/presentation/contracts";
import { createHttpClient } from "@/tests/integration/utils";

export const playMatchScenario = async (request: PlayMatchRequest, accessToken: string): Promise<AxiosResponse> => {
    const httpClient = createHttpClient(accessToken);
    const { code, ...playMatchRequest } = request;

    return await httpClient.post(`match/${code}/play`, playMatchRequest);
}