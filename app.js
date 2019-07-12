var express = require('express')
var app = express()
const path = require('path')

app.listen(process.env.PORT || 3000)
var occupied = '0'

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

app.get('/', (req, res) => {
  res.send(occupied)
})

app.post('/bathroom', (req, res) => {
  console.log(req.text)
  occupied = req.text
  return res.status(201).send(req.body)
})
