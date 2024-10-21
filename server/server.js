import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import passport from 'passport'
import http from 'http'
import config from './config'
import Html from '../client/html'
import mongooseService from './services/mongoose'
import passportJWT from './services/passport.js'
import jwt from 'jsonwebtoken'
import User from './model/User.model'
import WorkSpace from './model/WorkSpace.model'
import shortid from 'shortid'

require('colors')

let Root

mongooseService.connect()
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

const connections = []

const port = process.env.PORT || 8090
const app = express()

const middleware = [
  cors(),
  passport.initialize(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

passport.use('jwt', passportJWT.jwt)

middleware.forEach((it) => app.use(it))

app.get('/api/v1/auth', async (req, res) => {
  try {
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

app.post('/api/v1/auth', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    delete user.password
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', user, token })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', err })
  }
})

app.post('/api/v1/registration', async (req, res) => {
  const { email, password, name } = req.body
  const user = new User({
    userId: shortid.generate(),
    email,
    password,
    name,
    userName: `@ ${name.split(' ')[0]}`
  })
  await user.save()
  res.json({ status: 'ok' })
})

app.get('/api/v1/getWorkSpaces/', async (req, res) => {
  const workSpace = await WorkSpace.find({})
  res.json(workSpace)
})

app.get('/api/v1/getUsers/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

app.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Chat'
}).split('separator')

// app.get('/', (req, res) => {
//   const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
//   res.write(htmlStart)
//   appStream.pipe(res, { end: false })
//   appStream.on('end', () => {
//     res.write(htmlEnd)
//     res.end()
//   })
// })

// app.get('/*', (req, res) => {
//   const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
//   res.write(htmlStart)
//   appStream.pipe(res, { end: false })
//   appStream.on('end', () => {
//     res.write(htmlEnd)
//     res.end()
//   })
// })
app.get('/', (req, res) => {
  res.send(`
    <h2>This is SkillCrucial Express Server!</h2>
    <h3>Client hosted at <a href="http://localhost:8087">localhost:8087</a>!</h3>
  `)
})

app.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})


const server = http.createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  connections.push(socket.id)
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket.id), 1)
    console.log('this is socket disconnect', socket.id)
  })

  socket.on('message', async ({ message, workSpaceId, channelId, userId }) => {
    await WorkSpace.findOne({ id: workSpaceId })
      .exec()
      .then((workSpace) => {
        const channel = workSpace.channels.find(({ id }) => id === channelId)
        channel.messages = [
          ...channel.messages,
          {
            userId,
            messageId: shortid.generate(),
            text: message,
            date: `${new Date().getHours()}:${new Date().getMinutes()}`
          }
        ]
        socket.emit('updateWorkSpaces', workSpace)
        workSpace.save()
      })
  })
})

server.listen(port)

console.log(`Serving at http://localhost:${port}`)
