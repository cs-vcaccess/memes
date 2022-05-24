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
server.post('/', (req, res) => {
  if (req.files) {

  } else req.status(400).send("No file uploaded")
})
