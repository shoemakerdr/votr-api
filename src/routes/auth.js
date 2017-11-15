import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { createUser, getUser } from '../queries'
import { comparePassword, createPasswordHash } from '../helpers'
import { generateToken } from '../helpers'

//configure passport strategy
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await getUser(username)
            if (user.error)
                return done(null, false)
            if (!comparePassword(password, user.password))
                return done(null, false)
            return done(null, user)
        }
        catch (err) {
            return done(err)
        }
    }
))

const router = Router()

router.route('/login')
    .post(passport.authenticate('local', {session: false}), (req,res) => generateToken(req.user.username)(req,res))

router.route('/register')
    .post((req, res) => {
        const username = req.body.username
        const password = createPasswordHash(req.body.password)
        // res.json({user: username, password: password})
        createUser(username, password)
            .then(data => {
                if (data.error)
                    res.json(data)
                else generateToken(data.username)(req,res)
            })
    })

export default router

