import { Router } from 'express'
import { getUserPolls, createUser } from '../queries'

const router = Router()

router.route('/:username/polls')
    .get((req, res) => {
        getUserPolls(req.params.username).then(data => res.json(data))
    })

export default router

