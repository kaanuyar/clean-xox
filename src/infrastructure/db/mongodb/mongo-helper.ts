import { MongoClient, Collection } from 'mongodb'
import { v4 as uuidv4 } from 'uuid';

export const MongoHelper = {
    client: null as MongoClient | null,
    uri: null as string | null,

    async connect(uri: string): Promise<void> {
        this.uri = uri;
        this.client = await MongoClient.connect(uri, {
            pkFactory: {
                createPk: () => uuidv4()
            }
        });
    },

    async disconnect(): Promise<void> {
        await this.client?.close();
        this.client = null;
    },

    // TODO: try to remove undefined from return signature and add isClientConnected before calling
    async getCollection(name: string): Promise<Collection | undefined> {
        return this.client?.db().collection(name);
    },
    
    map: (data: any): any => {
        const { _id, ...rest } = data;
        return Object.assign({}, rest, { id: _id });
    },

    mapCollection: (collection: any[]): any[] => {
        return collection.map(c => MongoHelper.map(c));
    }
};