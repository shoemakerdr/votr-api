import pgp from 'pg-promise'

const connect = process.env.DATABASE_URL
const db = pgp()(connect)

export default db
