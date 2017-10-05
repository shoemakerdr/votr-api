import { Router } from 'express'

const router = Router()

router.route('/')
    .get((req, res) => {
        const json = JSON.stringify({polls:['poll1', 'poll2','poll3']})
        res.json(json)
    })


router.route('/:poll')
    .get((req, res) => {
        const json = JSON.stringify({poll:req.params.poll})
        res.json(json)
    })

export default router
