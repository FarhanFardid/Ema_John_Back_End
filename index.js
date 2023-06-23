const express = require('express');
const app = express();
const port = process.env.PORT || 5000;


// Middleware

const cors = require('cors');
app.use(cors());
require('dotenv').config();

app.get('/', (req,res)=>{
    res.send("Ema-John server is Running.....")
})

app.listen(port, ()=>{
    console.log('The Server is running on port', port);
})