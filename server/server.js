import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import http from 'http'
import { readFile } from 'fs'
import Html from '../client/html'

require('colors')

let Root
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
  express.static(path.resolve(__dirname, '../dist/assets')),
  bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  bodyParser.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => app.use(it))

app.get('/api/v1/getWorkSpaces/', async (req, res) => {
  readFile(`${__dirname}/data.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    res.json(JSON.parse(data))
  })
})

app.get('/api/v1/getUsers/', async (req, res) => {
  readFile(`${__dirname}/users.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    }
    res.json(JSON.parse(data))
  })
})

app.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Chat'
}).split('separator')

app.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

app.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
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
})

server.listen(port)

console.log(`Serving at http://localhost:${port}`, connections)
