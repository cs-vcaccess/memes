const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const path = require('path')
const express = require('express')
const fs = require('fs')
const { Pool } = require('pg')
const theFileUploader = require('express-fileupload');
const server = express()
const db = new Pool({
  host: 'localhost',
  user: 'ratpuppymagic',
  database: 'memes'
})

server.use(express.json())
server.use(theFileUploader())
server.listen(3000)

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
server.post('/', async (req, res) => {
  try {
    if (req.files) {
      const type = req.files.file.mimetype.match(/^[a-z]+/g)
      await db.query(`INSERT INTO meme (data, type) VALUES (${req.files.file.data}, '${type}')`)
      req.status(200).send("Worked")
    } else req.status(400).send("No file uploaded")
  } catch (err) { res.status(500).json(err) }
})
