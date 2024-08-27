const express = require('express');
require("dotenv").config();
const server = express();
const router = require('./router')
const multer = require('multer');
const storage = require('./multerConfig');


// configura o servidor
server.use(express.json());

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// configura multer
const upload = multer({ storage: storage });

//#region :: Endpoints

server.post('/upload', upload.single('file'), async (req, res) => {
    await resolveRequisicoes(req, res);
});

server.post('/interacao', async (req, res) => {
    await resolveRequisicoes(req, res);
});

server.get('/', (req, res) => {
    res.json({ok: true});
    console.log('Acessou!');
});

//#endregion

// Notifica que o sevidor está rodando
server.listen(3000, () => {
    console.log('Rodando na porta 3000');
});

//#region :: Funções Auxiliares

async function resolveRequisicoes(req, res){
    const ROUTER = new router()
        , body = req.body
    ;
    try {
        let results = await ROUTER.resolver(body.interacao, body);

        if(results.erro){
            res.status(results.codigo || 500).json(results);
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
}

//#endregion 
