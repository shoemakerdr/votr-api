import { Router } from 'express'
import { getUserPolls, addUser } from '../queries'

const router = Router()

router.route('/')
    .post((req, res) => {
        const username = req.body.username
        addUser(username).then(data => res.json(data))
    })

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

