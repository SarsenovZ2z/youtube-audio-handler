import express from 'express'
import audioRoutes from './routes/audio'
import authRoutes from './routes/auth'

const PORT = process.env.PORT || 3000

const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use('/api/audio', audioRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`))
