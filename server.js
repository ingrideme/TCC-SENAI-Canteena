const express = require ('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://conrado:root@cluster0.mddey.mongodb.net/teste-conexao?retryWrites=true&w=majority', {
    useUnifiedTopology: true, 
    useNewUrlParser: true, 
    useFindAndModify: false,
    useCreateIndex: true
})
.then(() => console.log("Conectado ao banco de dados"))
.catch((err) => console.log(`Erro ao conectar o banco ${err}`))


app.use(cors());
app.use(bodyparser.json())
app.use(cookieParser());
app.use(express.json());
app.use(routes);


app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`)
});
