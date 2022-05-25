const path = require('path')
const express = require('express')
const fs = require('fs')
const { Pool } = require('pg')
const server = express()
var bodyParser = require('body-parser')
const db = new Pool({
  host: 'localhost',
  user: 'ratpuppymagic',
  database: 'todo'
})

server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(express.static("whateverIwant"))
server.listen(3000)

server.get('/read', async (req, res) => {
  const {rows} = await db.query(`select * from item`)
  res.json(rows)
})

server.post('/create', async (req, res) => {
  const { title, body } = req.body
  console.log(`Data is literally (${title}) (${body})`)
  try {
    await db.query(`INSERT INTO item (title, body) VALUES ('${title}', '${body}')`)
  } catch (err) { console.error(err.message) }
  res.send("You've hit the post")
})

