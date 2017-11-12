import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { createUser, getUser } from '../queries'
import { comparePassword, createPasswordHash } from '../helpers'

//configure passport strategy
// passport.use(new LocalStrategy(
    // (username, password, done) => {
//
    // }
// ))
const router = Router()

router.route('/login')
    .post((req, res) => {
        console.log(req.body)
        const username = req.body.username
        const password = req.body.password
        console.log(username)
        getUser(username).then(data => res.json(data))
    })

router.route('/register')
    .post((req, res) => {
        const username = req.body.username
        const password = createPasswordHash(req.body.password)
        res.json({user: username, password: password})
        // createUser(username, password).then(data => res.json(data))
    })

export default router

