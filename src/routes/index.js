import { Router } from 'express'
import polls from './polls'
import users from './users'

/**
 * Routes:
 *    /polls
 *    /polls/:poll
 *    /users/:user
 *    /users/:user/polls
 */

const router = Router()

router.route('/')
    .get((req, res) => {
        const json = {message: 'Welcome to the Votr API!'}
        res.json(json)
    })

router.use('/polls', polls)
router.use('/users', users)

export default router
