const express = require('express');
const cors = require('cors');
const http =require('http');
const config = require('./config');
const {initSocket} = require('./controllers/socketcontroller');
const initRoutes = require('./routes/index');

const app = express();
app.use(cors());

// initRoutes(app); 
const server = http.createServer(app).listen(config.PORT,()=>{console.log(`listening to port ${config.PORT}`)});
initSocket(server);


