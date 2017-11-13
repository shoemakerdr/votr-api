import { Router } from 'express'
import polls from './polls'
import users from './users'
import auth from './auth'
import jwt from 'jsonwebtoken'

const router = Router()

router.route('/')
    .get((req, res) => {
        const json = {message: 'Welcome to the Votr API!'}
        res.json(json)
    })

router.use('/polls', polls)
router.use('/users', users)
router.use('/auth', auth)

export default router
