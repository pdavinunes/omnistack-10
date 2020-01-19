const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const routes = require('./routes')
const http = require('http')
const {setupWebSocket} = require('./websocket') 

const app = express();
const server = http.Server(app)

setupWebSocket(server)

//mongodb+srv://davinunes:<password>@cluster0-keo1v.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb://davinunes:admin@cluster0-shard-00-00-keo1v.mongodb.net:27017,cluster0-shard-00-01-keo1v.mongodb.net:27017,cluster0-shard-00-02-keo1v.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', 
    {useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,}
) 

app.use(cors())
app.use(express.json());
app.use(routes)

// Verbos HTTP: get, post, put, delete

// Tipos de parâmetros do express:
// Query Params: request.query (Filtros, ordenação, paginação, ...) 
// Route Params: request.params (Identificar um recurso na aplicação)
// Body: request.body (Dados para criação ou alteração de um registro) 

// MongoDB (Não-relacional)

server.listen(3333);