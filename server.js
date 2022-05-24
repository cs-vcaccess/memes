const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const path = require('path')
const express = require('express')
const fs = require('fs')
const { Pool } = require('pg')
const theFileUploader = require('express-fileupload');
const server = express()
// const db = new Pool({
//   host: 'localhost',
//   user: 'ratpuppymagic',
//   database: 'memes'
// })
const db = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'ratpuppymagic',
    database: 'memes'
  }
})

server.use(express.json())
server.use(theFileUploader())
server.listen(3000)

server.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})
server.get('/:id', async (req, res) => {
  const media = await db('meme').where({id: req.params.id}).first()
  res.render('index', media)
})
server.post('/', async (req, res) => {
  try {
    if (req.files) {
      const fileType = req.files.file.mimetype.match(/^[a-z]+/g)
      await db.insert({data: req.files.file.data, type: 'image'}).into('meme')
      req.status(200).send("Worked")
    } else req.status(400).send("No file uploaded")
  } catch (err) { res.status(500).json(err) }
})
