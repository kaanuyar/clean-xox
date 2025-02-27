import { UpdateMatchByCodeRepository } from "@/application/protocols/db/match";
import { AddMoveToMatchUnitOfWork, AddPlayerToMatchUnitOfWork } from "@/application/protocols/db/match-aggregate";
import { AddMatchMoveRepository } from "@/application/protocols/db/match-move";
import { AddMatchPlayerRepository } from "@/application/protocols/db/match-player";
import { DbConnection } from "@/infrastructure/db/connection";
import { DbTransaction, Repository } from "@/infrastructure/db/protocols";

export class MatchUnitOfWork implements AddPlayerToMatchUnitOfWork, AddMoveToMatchUnitOfWork {
    constructor(
        private readonly dbConnection: DbConnection,
        private readonly updateMatchByCodeRepository: UpdateMatchByCodeRepository & Repository,
        private readonly addMatchPlayerRepository: AddMatchPlayerRepository & Repository,
        private readonly addMatchMoveRepository: AddMatchMoveRepository & Repository
    ) {}

    async addPlayer(data: AddPlayerToMatchUnitOfWork.Params): Promise<AddPlayerToMatchUnitOfWork.Result> {
        const { match, matchPlayer, skipCondition } = data;

        try {
            return await this.dbConnection.db.transaction(async (transaction: DbTransaction) => {
                this.updateMatchByCodeRepository.setTransaction(transaction);
                this.addMatchPlayerRepository.setTransaction(transaction);

                const createdMatchPlayer = await this.addMatchPlayerRepository.add(matchPlayer);
                if (!createdMatchPlayer) {
                    transaction.rollback();
                }

                if (skipCondition) {
                    return true;
                }

                const updatedMatch = await this.updateMatchByCodeRepository.update(match);
                if (!updatedMatch) {
                    transaction.rollback();
                }

                return true;
            });
        } catch {
            return false;
        }
    }

    async addMove(data: AddMoveToMatchUnitOfWork.Params): Promise<AddMoveToMatchUnitOfWork.Result> {
        const { match, matchMove, skipCondition } = data;

        try {
            return await this.dbConnection.db.transaction(async (transaction: DbTransaction) => {
                this.updateMatchByCodeRepository.setTransaction(transaction);
                this.addMatchMoveRepository.setTransaction(transaction);

                const createdMatchMove = await this.addMatchMoveRepository.add(matchMove);
                if (!createdMatchMove) {
                    transaction.rollback();
                }

                if (skipCondition) {
                    return true;
                }

                const updatedMatch = await this.updateMatchByCodeRepository.update(match);
                if (!updatedMatch) {
                    transaction.rollback();
                }

                return true;
            });
        } catch {
            return false;
        }
    }
}