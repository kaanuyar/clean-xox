import { MatchResultEnum, MatchStateEnum } from "@/src/domain/constants";
import { createMatchScenario } from "@/tests/integration/api/create-match.scenario";
import { getMatchScenario } from "@/tests/integration/api/get-match.scenario";
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

    it('should get match info when match is not started, return 200', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);

        const response = await getMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 200,
            data: {
                code: code,
                state: MatchStateEnum.WaitingForPlayers,
                result: null,
                game: {
                    board: [ null, null, null, null, null, null, null, null, null ],
                    symbolToPlay: 'X',
                    turnsPlayed: 0
                }
            }
        });
    });

    it('should get match info when match is ongoing, return 200', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 1 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 2 }, firstPlayerToken);

        const response = await getMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 200,
            data: {
                code: code,
                state: MatchStateEnum.Ongoing,
                result: null,
                game: {
                    board: [ 'X', 'O', 'X', null, null, null, null, null, null ],
                    symbolToPlay: 'O',
                    turnsPlayed: 3
                }
            }
        });
    });

    it('should get match info when a player wins the match, return 200', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        await playMatchScenario({ code, symbolPosition: 0 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 1 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 3 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 4 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 6 }, firstPlayerToken);

        const response = await getMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 200,
            data: {
                code: code,
                state: MatchStateEnum.Finished,
                result: MatchResultEnum.X,
                game: {
                    board: [ 'X', 'O', null, 'X', 'O', null, 'X', null, null ],
                    symbolToPlay: null,
                    turnsPlayed: 5
                }
            }
        });
    });

    it('should get match info when match is a draw, return 200', async () => {
        const code = (await createMatchScenario(firstPlayerToken)).data.matchCode;
        await joinMatchScenario({ code }, firstPlayerToken);
        await joinMatchScenario({ code }, secondPlayerToken);

        await playMatchScenario({ code, symbolPosition: 4 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 0 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 8 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 6 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 3 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 5 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 1 }, firstPlayerToken);
        await playMatchScenario({ code, symbolPosition: 7 }, secondPlayerToken);
        await playMatchScenario({ code, symbolPosition: 2 }, firstPlayerToken);

        const response = await getMatchScenario({ code }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 200,
            data: {
                code: code,
                state: MatchStateEnum.Finished,
                result: MatchResultEnum.Draw,
                game: {
                    board: [ 'O', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'X' ],
                    symbolToPlay: null,
                    turnsPlayed: 9
                }
            }
        });
    });

    it('should fail to get match info with invalid data, return 400', async () => {
        const response = await getMatchScenario({ code: 'sallama-kod' }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Code must be exactly 8 characters long' }
                ]
            }
        });
    });

    it('should fail to get match info with invalid token, return 401', async () => {
        const response = await getMatchScenario({ code: '12345678' }, 'token-dedigin-nedir-ki');

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received access token is invalid' }
                ]
            }
        });
    });

    it('should fail to get match info with non existent match code, return 404', async () => {
        const response = await getMatchScenario({ code: '12345678' }, firstPlayerToken);

        expect(response).toMatchObject({
            status: 404,
            data: {
                errors: [
                    { message: 'The match was not found' }
                ]
            }
        });
    });
});