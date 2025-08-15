import { createMatchScenario } from "@/tests/integration/api/create-match.scenario";
import { joinMatchScenario } from "@/tests/integration/api/join-match.scenario";
import { playMatchScenario } from "@/tests/integration/api/play-match.scenario";
import { registerScenario } from "@/tests/integration/api/register.scenario";

describe('POST /match/{code}/play', () => {
    let firstPlayerToken: string = '';
    let secondPlayerToken: string = '';

    beforeAll(async () => {
        firstPlayerToken = (await registerScenario()).data.accessToken;
        secondPlayerToken = (await registerScenario({ email: 'bende@burdayim.com'})).data.accessToken;
    });

    it('should both players play a move successfully, return 204', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        const firstResponse = await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);
        const secondResponse = await playMatchScenario({ code, symbolPosition: 1 }, secondPlayerToken);

        [firstResponse, secondResponse].forEach((response) => {
            expect(response).toMatchObject({
                status: 204
            });
        });
    });

    it('should fail to play a move with invalid data, return 400', async () => {
        const response = await playMatchScenario({ code: 'sallama-kod', symbolPosition: 10 }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Code must be exactly 8 characters long' },
                    { message: 'SymbolPosition must be a number between 0 and 8' }
                ]
            }
        });
    });

    it('should fail to play a move with invalid token, return 401', async () => {
        const response = await playMatchScenario({ code: '12345678', symbolPosition: 0 }, 'token-dedigin-nedir-ki');

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received access token is invalid' }
                ]
            }
        });
    });

    it('should fail to play a move when its not players turn, return 403', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);
        const response = await playMatchScenario({ code, symbolPosition: 1 }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 403,
            data: {
                errors: [
                    { message: 'The player is not allowed to play this turn' }
                ]
            }
        });
    });

    it('should fail to play a move with non existent match code, return 404', async () => {
        const response = await playMatchScenario({ code: '12345678', symbolPosition: 0 }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 404,
            data: {
                errors: [
                    { message: 'The match was not found' }
                ]
            }
        });
    });

    it('should fail to play a move when player didnt join, return 404', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        const thirdPlayerToken = (await registerScenario({ email: 'istenmeyen@cocuk.com'})).data.accessToken;
        const response = await playMatchScenario({ code, symbolPosition: 0 }, thirdPlayerToken);

        expect(response).toMatchObject({
            status: 404,
            data: {
                errors: [
                    { message: 'The player is not part of this match' }
                ]
            }
        });
    });

    it('should fail to play a move where match is not ongoing, return 409', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);

        const response = await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 409,
            data: {
                errors: [
                    { message: 'The match is unavailable' }
                ]
            }
        });
    });

    it('should fail to play a move when board position is already used, return 409', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);
        const response = await playMatchScenario({ code, symbolPosition: 0 }, secondPlayerToken);

        expect(response).toMatchObject({
            status: 409,
            data: {
                errors: [
                    { message: 'The board position is already used' }
                ]
            }
        });
    });
});