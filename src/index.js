import express from 'express'
import router from './routes'

const app = express()

app.use('/api', router)

app.get('/', (req, res) => {
    const json = JSON.stringify({message: 'Welcome to the votr API. Please use the /api route.'})
    res.json(json)
})

app.listen(process.env.PORT || 8000)

export default app
