import { AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from "@/application/protocols/db/account";
import { MongoHelper } from "@/infrastructure/db/mongodb";

export class AccountMongoRepository implements AddAccountRepository, CheckAccountByEmailRepository, LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {

    async add(data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection?.insertOne(data);
        return result?.acknowledged ?? false;
    }

    async checkByEmail(email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const account = await accountCollection?.findOne({
            email
        }, 
        {
            projection: {
                _id: 1
            }
        });

        return account !== null;
    }

    async loadByEmail(email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
        const accountCollection = await MongoHelper.getCollection('accounts');
        const account = await accountCollection?.findOne({
            email
        }, 
        {
            projection: {
                _id: 1,
                name: 1,
                password: 1
            }
        });

        return account && MongoHelper.map(account);
    }

    async updateAccessToken(data: UpdateAccessTokenRepository.Params): Promise<UpdateAccessTokenRepository.Result> {
        const { id, token } = data;
        const accountCollection = await MongoHelper.getCollection('accounts');
        const result = await accountCollection?.updateOne({
            _id: id as any
        }, {
            $set: {
                accessToken: token
            }
        });

        return result?.acknowledged ?? false;
    } 
}