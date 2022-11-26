const mongoose = require('mongoose')

const URL = 'mongodb+srv://avass:avass1979004912@cluster0.x8htsme.mongodb.net/Avass-coled'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected', ()=>{
    console.log('Mongo DB Connection Successfull')
})

connectionObj.on('error', ()=>{
    console.log('Mongo DB Connection Failed')
})