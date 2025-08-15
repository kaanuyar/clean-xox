import { loginScenario } from "@/tests/integration/api/login.scenario";
import { registerScenario } from "@/tests/integration/api/register.scenario";

describe('POST /login', () => {
    beforeAll(async () => {
        await registerScenario();
    });

    it('should login successfully with valid credentials, return 200', async () => {
        const response = await loginScenario();

        expect(response).toMatchObject({
            status: 200,
            data: {
                accessToken: expect.any(String)
            }
        });
    });

    it('should fail to login with invalid data, return 400', async () => {
        const response = await loginScenario({
            email: 'nerden-baksan-email-degil',
            password: undefined
        });

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Invalid email address' },
                    { message: 'Password is required' }
                ]
            }
        });
    });

    it('should fail to login when email is unregistered, return 401', async () => {
        const response = await loginScenario({
            email: 'boyle-bir@email-yok-aslinda.com'
        });

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received email is not registered' }
                ]
            }
        });
    });

    it('should fail to login when password is invalid, return 401', async () => {
        const response = await loginScenario({
            password: 'yanlis-sifre-malesef-bi-beceremedin'
        });

        expect(response).toMatchObject({
            status: 401,
            data: {
                errors: [
                    { message: 'The received password is invalid' }
                ]
            }
        });
    });
});