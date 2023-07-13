import express, { Request, Response } from 'express'
import audioRoutes from './routes/audio'
import authRoutes from './routes/auth'
import * as WebSocket from 'ws'
import * as http from 'http'

const PORT = process.env.PORT || 3000

const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.static('public'))
app.use('/api/audio', audioRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`))

const WS_PORT = process.env.WS_PORT || 8999

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// TODO: random uid generator
const uids: { [key: string]: any } = {}
let cnt = 1

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        const event = JSON.parse(message)
        if (event.type == 'refresh') {
            const uid = `uid_${cnt++}`
            uids[uid] = ws
            ws.send(JSON.stringify({
                type: 'uid',
                data: uid
            }))
        }
    })
})

app.use('/api/auth/signin', (req: Request, res: Response) => {
    const uid: string = req.query.uid as string
    const accessToken: string = req.query.token as string

    if (!uids.hasOwnProperty(uid)) {
        res.json({
            success: false
        })
        return
    }

    const ws: WebSocket = uids[uid]
    delete uids[uid]

    ws.send(JSON.stringify({
        type: 'token',
        data: accessToken,
    }))

    res.json({
        success: true
    })
})

server.listen(WS_PORT, () => console.log(`WS Server started on port ${WS_PORT}`))