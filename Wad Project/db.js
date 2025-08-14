const { connect } = require('http2');
const mongoose=require('mongoose');
const { disconnect } = require('process');

const mongooseURL='mongodb://localhost:27017/Urban_Woods';

mongoose.connect(mongooseURL);

const db=mongoose.connection;

//events

db.on('connected',()=>{
     console.log('Database Connected')
});

db.on('disconnect', ()=>{
    console.log('Database disconnected')
});

db.on('error', (err)=>{
    console.log('Error connecting database')
});

module.exports=db;