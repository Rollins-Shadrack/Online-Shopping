const express = require('express')
const proxy = require('express-http-proxy')
const cors = require('cors')
const app = express();


app.use(cors());
app.use(express.json());

app.use('/customer', proxy('http://localhost:8001'))
app.use('/', proxy('http://localhost:8002')) // products

//server
const PORT = process.env.PORT || 8000;
app.listen(PORT,(()=>{
    console.log(`Gateway server started at port ${PORT}`)
}))










