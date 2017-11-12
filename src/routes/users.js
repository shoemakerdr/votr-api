import { Router } from 'express'
import { getUserPolls, addUser } from '../queries'

const router = Router()

router.route('/')
    .post((req, res) => {
        const username = req.body.username
        addUser(username).then(data => res.json(data))
    })

router.route('/:username')
    .get((req, res) => {
        const json = {username:req.params.username}
        res.json(json)
    })

router.route('/:username/polls')
    .get((req, res) => {
        getUserPolls(req.params.username).then(data => res.json(data))
    })

export default router

