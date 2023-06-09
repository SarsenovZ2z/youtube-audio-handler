import express from 'express'
import audioRoutes from './routes/audio'

const PORT = process.env.PORT || 3000

const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use('/api/audio', audioRoutes)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`))
