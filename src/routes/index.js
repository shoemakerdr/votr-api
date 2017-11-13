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

// JWT auth middleware
const jwtAuth = (req, res, next) => {
    const token = req.headers['token']
    if (token)
        jwt.verify(token, process.env.AUTH_SECRET, (err, decode) => {
            if (err)
                res.status(500).json({error: 'Invalid token'})
            else next()
        })
    else res.json({error: 'Must include token with requests'})
}

router.use('/polls', jwtAuth, polls)
router.use('/users', jwtAuth, users)
router.use('/auth', auth)

export default router
