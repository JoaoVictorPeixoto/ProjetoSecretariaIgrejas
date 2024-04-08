const express = require('express');
require("dotenv").config();
const server = express();
const router = require('./router')

server.use(express.json());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

server.post('/interacao', async (req, res) => {
    const ROUTER = new router()
        , body = req.body
    ;
    try {
        let results = await ROUTER.resolver(body.interacao, body);

        if(results.erro){
            res.status(401).json(results);
        } else {
            res.json(results);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            erro: true,
            mensagem: "Erro interno: " + error.code
        });
    }
    
    
})

server.get('/', (req, res) => {
    res.json({ok: true});
    console.log('Acessou!');
})


server.listen(3000, () => {
    console.log('Rodando na porta 3000');
});


