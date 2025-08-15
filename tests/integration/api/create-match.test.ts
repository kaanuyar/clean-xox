import { createMatchScenario } from "@/tests/integration/api/create-match.scenario";
import { registerScenario } from "@/tests/integration/api/register.scenario";

describe('POST /match', () => {
    let accessToken: string = '';

    beforeAll(async () => {
        accessToken = (await registerScenario()).data.accessToken;
    });

    it('should create a new match successfully, return 200', async () => {
        const response = await createMatchScenario(accessToken);

        expect(response).toMatchObject({
            status: 200,
            data: {
                matchCode: expect.any(String)
            }
        });
    });

    it('should fail to create a match with invalid token, return 401', async () => {
        const response = await createMatchScenario('token-dedigin-nedir-ki');

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received access token is invalid' }
                ]
            }
        });
    });
});