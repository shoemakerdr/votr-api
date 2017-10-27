import pg from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config()

const db = pg()(process.env.DATABASE_TEST)

const getAllPolls = async () => {
    try {
        const data = await db.any('SELECT poll_id, title FROM polls;')
        return data
    }
    catch (err) {
        console.error(err)
    }
}

const getUserPolls = async user_id => {
    try {
        const data = await db.any(`
            SELECT poll_id, title
            FROM polls
            WHERE user_id = $1;
            `, user_id)
        return data
    }
    catch (err) {
        console.error(err)
    }
}

const getPoll = async poll_id => {
    try {
        const data = await db.any(`
            SELECT polls.title, options.option, options.option_id, COUNT(votes.vote_id) as num_of_votes
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
        const options = data.map(option => {
            return {
                id: option.option_id,
                name: option.option,
                votes: option.num_of_votes
            }
        })
        return { title, options }
    }
    catch (err) {
        console.error(err)
    }
}

const addUser = async username => {
    /**
     * possible query:
     * -> INSERT INTO users(username)
     *    VALUES(<username>);
     */
}

const addPoll = async (user_id, title, options) => {
    try {
        const poll = await db.tx(async t => {
            const poll = await t.one(`
                INSERT INTO polls(title, user_id)
                VALUES($1, $2)
                RETURNING poll_id;
            `, [title, user_id])
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
        console.error(err)
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
        console.error(err)
    }
}

const addVote = async (poll_id, option_id, username, ip_address) => {
    /**
     * possible query:
     * -> INSERT INTO votes(poll_id, option_id, username_or_ip)
     *    VALUES(<poll_id>, <option_id>, <username_or_ip>);
     */
    try {
        const query = await db.none(`
            INSERT INTO votes(poll_id, option_id, username, ip_address)
            VALUES($1, $2, $3, $4);
        `, [poll_id, option_id, username, ip_address])
        return {success: true}
    } catch (err) {
        console.error(err)
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
        console.error(err)
    }
}

export {
    getAllPolls,
    getUserPolls,
    getPoll,
    addUser,
    addPoll,
    addOption,
    addVote,
    removePoll
}
