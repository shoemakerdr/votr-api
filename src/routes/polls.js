import { Router } from 'express'
import {
    getAllPolls,
    getPoll,
    addPoll,
    addOption,
    addVote,
    removePoll
} from '../queries'

const router = Router()

router.route('/')
    .get((req, res) => {
        getAllPolls().then(data => res.json(data))
    })
    .post((req,res) => {
        const username = req.body.username
        const title = req.body.title
        const options = req.body.options.split('\n')
        addPoll(username, title, options).then(data => res.json(data))
    })


router.route('/:poll')
    .get((req, res) => {
        getPoll(req.params.poll).then(data => res.json(data))
    })
    .delete((req, res) => {
        removePoll(req.params.poll).then(data => res.json(data))
    })

router.route('/:poll/option')
    .post((req, res) => {
        const option = req.body.option
        const pollId = req.params.poll
        addOption(option, pollId).then(data => res.json(data))
    })

router.route('/:poll/vote')
    .post(async (req, res) => {
        const pollId = req.params.poll
        let optionId = req.body.optionId
        if(!optionId) {
            const option = req.body.option
            const { option_id } = await addOption(option, pollId)
            optionId = option_id
        }
        addVote(req.params.poll, optionId).then(data => res.json(data))
    })

export default router
