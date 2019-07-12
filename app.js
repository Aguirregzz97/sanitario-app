var express = require('express')
var app = express()
const path = require('path')
var MongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://andres-aguirre:J01GtxiiqmWVhPkC@inventariosanaencasa-5zhij.mongodb.net/test?retryWrites=true"

app.listen(process.env.PORT || 3000)

// to allow cors
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})
*/

app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = ''
    req.setEncoding('utf8')
    req.on('data', function(chunk){ req.text += chunk })
    req.on('end', next)
  } else {
    next()
  }
})

app.get('/', async (req, res) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true
  })
  const occupied = await client.db('SanaEnCasaDB').collection('sanitario').find().toArray()
  console.log(occupied)
  res.send(occupied[0].occupied)
})

app.post('/bathroom', async (req, res) => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true
  })
  await client.db('SanaEnCasaDB').collection('sanitario').update( { id: '1' }, {id: '1', occupied: req.text } )
  console.log(req.text)
  return res.status(201).send(req.body)
})
