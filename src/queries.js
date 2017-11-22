import pg from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config()

let db
if (process.env.NODE_ENV === 'test')
    db = pg()(process.env.DATABASE_TEST)
else 
    db = pg()(process.env.DATABASE_URL)

const genericErrorMessage = {
    error: 'There was an unknown error. Please try again later.'
}

const getAllPolls = async () => {
    try {
        const data = await db.any('SELECT poll_id, title FROM polls;')
        return data
    }
    catch (err) {
        return genericErrorMessage
    }
}

const getUserPolls = async username => {
    try {
        const data = await db.any(`
            SELECT poll_id, title
            FROM polls
            WHERE username = $1;
            `, username)
        return data
    }
    catch (err) {
        return genericErrorMessage
    }
}

const getPoll = async poll_id => {
    try {
        const data = await db.any(`
            SELECT polls.title, polls.username, options.option, options.option_id, COUNT(votes.vote_id) as num_of_votes
            FROM options
            LEFT OUTER JOIN votes ON options.option_id = votes.option_id
            INNER JOIN polls ON options.poll_id = polls.poll_id
            WHERE options.poll_id = $1
            GROUP BY polls.poll_id, options.option_id;
            `, poll_id)
        if (data[0] === undefined) {
            return {error: 'Poll does not exist'}
        }
        const title = data[0].title
        const author = data[0].username
        const options = data.map(option => {
            return {
                id: option.option_id,
                name: option.option,
                votes: option.num_of_votes
            }
        })
        return { title, author, options }
    }
    catch (err) {
        return genericErrorMessage
    }
}

const createUser = async (username, password) => {
    try {
        const user = await db.one(`
            INSERT INTO users(username, password)
            VALUES($1, $2)
            RETURNING username;
        `, [username, password])
        return user
    }
    catch (err) {
        if (/.+(username).+(already).+(exists)/.test(err.detail))
            return {error: 'Username already exists'}
        else return {error: err.message}
    }
}

const getUser = async username => {
    try {
        const user = await db.one(`
            SELECT username, password
            FROM users
            WHERE username = $1;
        `, username)
        return user
    }
    catch (err) {
        return genericErrorMessage
    }
}

const addPoll = async (username, title, options) => {
    try {
        const poll = await db.tx(async t => {
            const poll = await t.one(`
                INSERT INTO polls(title, username)
                VALUES($1, $2)
                RETURNING poll_id;
            `, [title, username])
            const optionQueries = options.map(option => {
                return t.none(`
                    INSERT INTO options(option, poll_id)
                    VALUES($1, $2);
                `, [option, poll.poll_id])
            })
            const queries = await t.batch(optionQueries)
            return poll
        })
        return poll
    } catch (err) {
        return genericErrorMessage
    }
}

const addOption = async (option, poll_id) => {
    try {
        const optionId = await db.one(`
            INSERT INTO options(option, poll_id)
            VALUES($1,$2)
            RETURNING option_id;
        `, [option, poll_id])
        return optionId
    } catch (err) {
        return genericErrorMessage
    }
}

const addVote = async (poll_id, option_id) => {
    try {
        const query = await db.none(`
            INSERT INTO votes(poll_id, option_id)
            VALUES($1, $2);
        `, [poll_id, option_id])
        return {success: true}
    } catch (err) {
        return genericErrorMessage
    }
}

const removePoll = async poll_id => {
    try {
        const queries = await db.tx(async t => {
            return t.batch([
                t.none(`DELETE FROM polls WHERE poll_id = $1;`, poll_id),
                t.none(`DELETE FROM options WHERE poll_id = $1;`, poll_id),
                t.none(`DELETE FROM votes WHERE poll_id = $1;`, poll_id)
            ])
        })
        return {success: true}
    } catch (err) {
        return genericErrorMessage
    }
}

export {
    getAllPolls,
    getUserPolls,
    getPoll,
    createUser,
    getUser,
    addPoll,
    addOption,
    addVote,
    removePoll
}
