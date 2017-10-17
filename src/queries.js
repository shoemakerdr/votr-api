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
     * -> SELECT poll_id, title FROM polls;
     *
     *     poll_id |             title
     *    ---------+-------------------------------
     *           1 | What is your favorite color?
     *           2 | What is your favorite animal?
     */
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
     * possible query:
     * -> SELECT polls.title, options.option, COUNT(votes.vote_id) as num_of_votes
     *    FROM votes
     *    INNER JOIN options ON options.option_id = votes.option_id
     *    INNER JOIN polls ON options.poll_id = polls.poll_id
     *    WHERE poll_id = <poll_id>
     *    GROUP BY polls.poll_id, options.option;
     *
     *                title             | option | num_of_votes
     *    ------------------------------+--------+--------------
     *     What is your favorite color? | green  |            2
     *     What is your favorite color? | red    |            1
     *     What is your favorite color? | blue   |            1
     */
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
