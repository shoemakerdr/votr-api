// load dotenv
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    const json = {message: 'Welcome to the votr API. Please use the /api route.'}
    res.json(json)
})

app.listen(process.env.PORT || 8000)

export default app
