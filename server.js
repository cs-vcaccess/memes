const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
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
  res.send('Oh Yeauh we online')
})
server.post('/create', (req, res) => {
  console.log("AND DA FIELS ARR")
  console.log(req.files)
  const {name, data} = req.files.pic
})
