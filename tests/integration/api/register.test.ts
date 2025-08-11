import { registerScenario } from "@/tests/integration/api/register.scenario";

describe('POST /register', () => {    
    it('should register a new user, return 200 containing access token', async () => {
        const response = await registerScenario();

        expect(response).toMatchObject({
            status: 200,
            data: {
                accessToken: expect.any(String)
            }
        });
    });

    it('should fail to register with invalid data, return 400', async () => {
        const response = await registerScenario({
            name: undefined,
            email: 'nerden-baksan-email-degil'
        });

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Name is required' },
                    { message: 'Invalid email address' }
                ]
            }
        });
    });

    it('should fail to register when passwords dont match, return 400', async () => {
        const response = await registerScenario({
            password: 'beni-tekrarla',
            passwordConfirmation: 'hayir-sanmiyorum'
        });

        expect(response).toMatchObject({
            status: 400,
            data: {
                errors: [
                    { message: 'Passwords do not match' }
                ]
            }
        });
    });

    it('should fail to register when email already in use, return 403', async () => {
        await registerScenario();
        const response = await registerScenario();

        expect(response).toMatchObject({
            status: 403,
            data: {
                errors: [
                    { message: 'The received email is already in use' }
                ]
            }
        });
    });
});