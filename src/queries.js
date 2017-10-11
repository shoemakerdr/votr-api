import pg from 'pg-promise'

const db = pg()(process.env.DATABASE_URL)

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
     * possible query:
     * -> SELECT poll_id,title FROM polls;
     */
}

const getUserPolls = async user_id => {
    /**
     * possible query:
     * -> SELECT title
     *    FROM polls
     *    WHERE user_id = $user_id
     */
}

const getPoll = async poll_id => {
    /**
     * possible query:
     * -> SELECT options.name, COUNT(votes.vote) AS num_of_votes, votes.users, votes.ip_addresses
     *    FROM votes 
     *    INNER JOIN options ON options.option_id = votes.options_id
     *    GROUP BY options.name;
     */
}

const addUser = async username => {
    /**
     * possible query:
     * -> INSERT INTO users(username)
     *    VALUES($username);
     */
}

const addPoll = async (user_id, title, options) => {
    /**
     * possible query:
     * -> INSERT INTO polls(title, user_id)
     *    VALUES('Title', 1);
     *
     *    INSERT INTO options(name)
     *    VALUES('option1');
     */
}

const addOption = async (name, poll_id) {
    /**
     * possible query:
     * -> INSERT INTO options(name, poll_id)
     *    VALUES('option2', 1);
     */
}

const addVote = async (poll_id, option_id, user_id, ip_address) {
    /**
     * possible query:
     * -> INSERT INTO votes(poll_id, option_id, user_id, ip_address)
     *    VALUES(1,1,'127.0.0.1');
     */
}

const removePoll = async (poll_id) {
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
