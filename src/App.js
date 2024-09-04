const express = require('express')
const path = require('path')
const app = express()

const commentSchema = require('./models/comment')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


