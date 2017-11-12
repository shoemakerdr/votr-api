import bcrypt from 'bcryptjs'

const comparePassword = (userPass, dbPass) => {
    return bcrypt.compareSync(userPass, dbPass)
}

const createPasswordHash = password => {
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(password, salt)
}

export {
    comparePassword,
    createPasswordHash,
}
