import bcrypt from 'bcryptjs'

const comparePassword = (userPass, dbPass) => {
    return bcrypt.compareSync(userPass, dbPass)
}

const createPasswordHash = password => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

const generateToken = username => (req, res) => {
    const expiration = Date.now() + 3600000
    const token = jwt.sign({user: username}, process.env.AUTH_SECRET, {
        expiresIn: 3600
    })
    res.json({
        token: token,
        username: username,
        expiration: expiration
    })
}

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

export {
    comparePassword,
    createPasswordHash,
    generateToken,
    jwtAuth,
}
