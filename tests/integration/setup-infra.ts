import { PostgreSqlContainer } from '@testcontainers/postgresql'

const setupInfra = async () => {
    const container = await new PostgreSqlContainer('postgres:17.5-alpine').withDatabase('clean_xox').start();
    process.env.DB_URL = container.getConnectionUri();
}

export default setupInfra;