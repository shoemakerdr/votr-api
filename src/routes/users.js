import { Router } from 'express'

const router = Router()

router.route('/:user')
    .get((req, res) => {
        const json = {user:req.params.user}
        res.json(json)
    })

router.route('/:user/polls')
    .get((req, res) => {
        const json = {user:req.params.user, polls: ['poll','poll','poll']}
        res.json(json)
    })

export default router

