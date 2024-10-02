import https from 'https';
import fs from "fs";
import express, { response } from 'express';
const app = express();

const privateKey = fs.readFileSync('./security/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./security/localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, () => {
    console.log('serveur https en écoute sur le port 3000');
});