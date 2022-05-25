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
let todoItems

server.use(express.urlencoded({extended: false}))
server.use(express.json())
server.use(express.static("whateverIwant"))
server.listen(3000)

server.get('/', async (req, res) => {
  const {rows} = await db.query(`select * from item`)
  todoItems = rows

})
server.post('/', async (req, res) => {
  console.log(req.body)
})

