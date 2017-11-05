// load dotenv
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import apiRoutes from './routes'

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors(corsOptions))
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    const json = {message: 'Welcome to the votr API. Please use the /api route.'}
    res.json(json)
})

app.listen(process.env.PORT || 8000)

export default app
