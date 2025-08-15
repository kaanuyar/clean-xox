import { createMatchScenario } from "@/tests/integration/api/create-match.scenario";
import { joinMatchScenario } from "@/tests/integration/api/join-match.scenario";
import { registerScenario } from "@/tests/integration/api/register.scenario";

describe('POST /match/{code}/join', () => {
    let firstPlayerToken: string = '';
    let secondPlayerToken: string = '';

    beforeAll(async () => {
        firstPlayerToken = (await registerScenario()).data.accessToken;
        secondPlayerToken = (await registerScenario({ email: 'bende@burdayim.com'})).data.accessToken;
    });

    it('should both players join to match successfully, return 204', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        const firstResponse = await joinMatchScenario({ code }, firstPlayerToken);
        const secondResponse = await joinMatchScenario({ code }, secondPlayerToken);

        [firstResponse, secondResponse].forEach((response) => {
            expect(response).toMatchObject({
                status: 204
            });
        });
    });

    it('should fail to join a match with invalid length match code, return 400', async () => {
        const response = await joinMatchScenario({ code: 'sallama-kod' }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Code must be exactly 8 characters long' }
                ]
            }
        });
    });

    it('should fail to join a match with invalid token, return 401', async () => {
        const response = await joinMatchScenario({ code: '12345678' }, 'token-dedigin-nedir-ki');

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received access token is invalid' }
                ]
            }
        });
    });

    it('should fail to join a match with non existent match code, return 404', async () => {
        const response = await joinMatchScenario({ code: '12345678' }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 404,
            data: {
                errors: [
                    { message: 'The match was not found' }
                ]
            }
        });
    });

    it('should fail to join a match where match is already started, return 409', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        const response = await joinMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 409,
            data: {
                errors: [
                    { message: 'The match is unavailable' }
                ]
            }
        });
    });

    it('should fail to join a match with already existing player, return 409', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);

        const response = await joinMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 409,
            data: {
                errors: [
                    { message: 'The player has already joined the match' }
                ]
            }
        });
    });
});