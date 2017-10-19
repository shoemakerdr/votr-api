import { Router } from 'express'
import { getUserPolls } from '../queries'

const router = Router()

router.route('/:user')
    .get((req, res) => {
        const json = {user:req.params.user}
        res.json(json)
    })

router.route('/:user/polls')
    .get((req, res) => {
        getUserPolls(req.params.user).then(data => res.json(data))
    })

export default router

