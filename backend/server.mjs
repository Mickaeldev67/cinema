import https from 'https';
import fs from "fs";
import express, { response } from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
dotenv.config();

const privateKey = fs.readFileSync('./security/localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('./security/localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3000, () => {
    console.log('serveur https en écoute sur le port 3000');
});

const fetchCurrentMovie = async () => {
    const url = 'https://api.themoviedb.org/3/movie/changes?page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjY1OTViNjZkMzM4ODBlYzg4Y2E0ODI3ZDY2NzI0OSIsIm5iZiI6MTcyODIyMjk4OS4wNzA2MTksInN1YiI6IjY2ZmZjN2ZiYzlhMTBkNDZlYTdjYzk4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S1OiI9QTGmQqohd81rQ2RuW2_UsRk9q0gHKo9kclf58'
      }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const moviesDetails = [];
        for (let i = 0; i < 10; i++) {
          moviesDetails[i] = await fetchingMoviesByIds(data.results[i]);
          console.log("movies details " + i + " : ");
          console.log(moviesDetails[i]);
        }
        return data;
    } catch(error) {
        console.log('error:' + error)
    }
}

const fetchingMoviesByIds = async (json) => {
  const url = 'https://api.themoviedb.org/3/movie/'+json.id+'?language=fr-FR';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjY1OTViNjZkMzM4ODBlYzg4Y2E0ODI3ZDY2NzI0OSIsIm5iZiI6MTcyODIyMjk4OS4wNzA2MTksInN1YiI6IjY2ZmZjN2ZiYzlhMTBkNDZlYTdjYzk4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S1OiI9QTGmQqohd81rQ2RuW2_UsRk9q0gHKo9kclf58'
      }
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log('error:' + error)
    }
}


app.get('/movies', async (req, res) => {
    const datalist = await fetchCurrentMovie();
    res.json("oui");
});