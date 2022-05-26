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
  const { rows } = await db.query(`SELECT * FROM item`)
  res.json(rows)
})
server.get('/read/:id', async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM item WHERE id = ${req.params.id}`)
    res.json(rows[0])
  } catch (err) { console.error(err.message) }
})
server.post('/create', async (req, res) => {
  const { title, body } = req.body
  try {
    await db.query(`INSERT INTO item (title, body) VALUES ('${title}', '${body}')`)
  } catch (err) { console.error(err.message) }
  res.send("You've hit the post")
})
server.patch('/update/:id', async (req, res) => {
  const { id, title, body } = req.body
  try {
    await db.query(`
      UPDATE item SET
        title = '${title}',
        body = '${body}'
      WHERE id = ${id}`)
  } catch (err) { console.error(err.message) }
})
server.delete('/delete/:id', async (req, res) => {
  try {
    await db.query(`DELETE FROM item WHERE id = ${req.params.id}`)
  } catch (err) { console.error(err.message) }
})
