import 'module-alias/register'
import 'dotenv/config'
import env from '@/entrypoint/config/env'
import app from '@/entrypoint/api/app'

app.listen(env.port, () => console.log(`server is running at http://localhost:${env.port}`));