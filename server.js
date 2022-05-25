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
  console.log(req.body)
  // await db.query(`select * `)
  res.send("You've hit the post")
})

