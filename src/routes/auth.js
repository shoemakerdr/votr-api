import { Router } from 'express'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { createUser, getUser } from '../queries'
import { comparePassword, createPasswordHash } from '../helpers'
import jwt from 'jsonwebtoken'

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

// jwt token generation
 const generateToken = username => (req, res) => {
    const expiration = Math.floor(Date.now() / 1000) + 3600
    const token = jwt.sign({user: username}, process.env.AUTH_SECRET, {
        expiresIn: 3600
    })
    res.json({
            token: token,
            username: username,
            expiration: expiration
    })
}

const router = Router()

router.route('/login')
    .post(passport.authenticate('local', {session: false}), (req,res) => generateToken(req.user.username)(req,res))

router.route('/register')
    .post((req, res) => {
        const username = req.body.username
        const password = createPasswordHash(req.body.password)
        // res.json({user: username, password: password})
        createUser(username, password)
            .then(data => generateToken(data.username)(req,res))
    })

export default router

