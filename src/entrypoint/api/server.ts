import { Server } from 'http';
import { once } from 'events';
import { logger } from '@/src/entrypoint/instances/logging';
import { getApp } from '@/src/entrypoint/api/app';
import { checkDbConnection, closeDbConnection } from '@/src/entrypoint/instances/db';

let server: Server | null = null;

export const startServer = async (port?: number): Promise<number> => {
    if (server) {
        throw new Error('Server already started');
    }
    
    const app = getApp();
    server = app.listen(port ?? 0);
    await once(server, 'listening');
    await checkDbConnection();

    const addressInfo = server.address();
    if (!addressInfo || typeof addressInfo === 'string') {
        throw new Error('Server address not found');
    }

    ({ port } = addressInfo);
    const { address } = addressInfo;
    const host = address === '::' ? 'localhost' : address;

    logger.info(`Server is running at http://${host}:${port}`);

    return port;
}

export const stopServer = async (): Promise<void> => {
    if (!server) {
        return;
    }

    server.close();
    await once(server, 'close');
    server = null;
    await closeDbConnection();

    logger.info('Server has been stopped');
}