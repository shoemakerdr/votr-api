import pg from 'pg-promise'
import dotenv from 'dotenv'
dotenv.config()

const db = pg()(process.env.DATABASE_TEST)

/**
 * /polls
 * -> [{poll: 'Name of poll'}...]
 *
 * /polls/:poll_id
 * -> {
 *   poll: 'Name of poll',
 *   options: [
 *     {
 *       name: 'Option 1',
 *       votes: 2,
 *     },
 *     {...}
 *   ],
 *   usersVoted: ['steve123',...],
 *   ipAddressesVoted: ['127.0.0.1',...]
 * }
 *
 */

const getAllPolls = async () => {
    /**
     * sample output:
     *    [
     *        {
     *            poll_id: 1,
     *            title: 'What is your favorite color?'
     *        },
     *        {
     *            poll_id: 2,
     *            title: 'What is your favorite animal?',
     *        }
     *    ]
     */
    try {
        const data = await db.any('SELECT poll_id, title FROM polls;')
        return data
    }
    catch (err) {
        console.error(err)
    }
}

const getUserPolls = async user_id => {
    /**
     * possible query:
     * -> SELECT poll_id, title
     *    FROM polls
     *    WHERE user_id = <user_id>;
     *
     *     poll_id |            title
     *    ---------+------------------------------
     *           1 | What is your favorite color?
     */
}

const getPoll = async poll_id => {
    /**
     * sample output:
     *     {
     *         title: 'What is your favorite color?",
     *         options: [
     *             {id: 1, name: 'blue', votes: 1},
     *             {id: 2, name: 'green', votes: 2},
     *             {id: 3, name: 'red', votes: 1}
     *         ]
     *     }
     */

    try {
        const data = await db.any(`
            SELECT polls.title, options.option, options.option_id, COUNT(votes.vote_id) as num_of_votes
            FROM options
            LEFT OUTER JOIN votes ON options.option_id = votes.option_id
            INNER JOIN polls ON options.poll_id = polls.poll_id
            WHERE options.poll_id = $1
            GROUP BY polls.poll_id, options.option_id;
        `, poll_id)
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
    /**
     * possible query:
     * -> INSERT INTO polls(title, user_id)
     *    VALUES(<title>, <user_id>);
     *
     *    (for each <option> in <options>)
     *    INSERT INTO options(option, poll_id)
     *    VALUES(<option>, (SELECT poll_id FROM polls WHERE title = <title>));
     */
}

const addOption = async (option, poll_id) => {
    /**
     * possible query:
     * -> INSERT INTO options(option, poll_id)
     *    VALUES(<option>, <poll_id>);
     */
}

const addVote = async (poll_id, option_id, username_or_ip) => {
    /**
     * possible query:
     * -> INSERT INTO votes(poll_id, option_id, username_or_ip)
     *    VALUES(<poll_id>, <option_id>, <username_or_ip>);
     */
}

const removePoll = async (poll_id) => {
    /**
     * possible query:
     * ->
     */
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
