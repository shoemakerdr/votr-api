import { Router } from 'express'
import { getUserPolls, createUser } from '../queries'
import { jwtAuth } from '../helpers'

const router = Router()

router.route('/:username/polls')
    .get(jwtAuth, (req, res) => {
        getUserPolls(req.params.username).then(data => res.json(data))
    })

export default router

