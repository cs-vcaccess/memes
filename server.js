const path = require('path')
const express = require('express')
const fs = require('fs')
const { Pool } = require('pg')
const server = express()
const db = new Pool({
  host: 'localhost',
  user: 'ratpuppymagic',
  database: 'todo'
})
let todoItems

server.use(express.json())
server.listen(3000)

server.get('/', async (req, res) => {
  const {rows} = await db.query(`select * from item`)
  todoItems = rows
  res.sendFile(path.join(__dirname, '/index.html'))
})
server.post('/', async (req, res) => {
  res.send("Good")
})
