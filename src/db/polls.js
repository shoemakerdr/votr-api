import db from 'db-instance'

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
     * example query:
     * -> SELECT poll_id,title FROM polls;
     *
     */

}

const getPoll = async poll_id => {

    /**
     * example query:
     * -> SELECT polls.title, options.name, COUNT(votes.vote) AS num_of_votes, votes.users, votes.ip_addresses
     *    FROM votes 
     *    INNER JOIN options ON options.option_id = votes.options_id
     *    INNER JOIN polls ON options.poll_id = polls.poll_id
     *    GROUP BY options.name;
     *
     */

}

export {
    getAllPolls,
    getPoll
}
