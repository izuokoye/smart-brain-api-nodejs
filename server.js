const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const Clarifai = require('clarifai');
const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'tp2.com',
        database : 'smart-brain'
    }
});
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const clarifai = new Clarifai.App({
    apiKey: '7c7587cf05404bbc9b7d347c33d63f7b'
});

// Route
app.get('/', (req, res) => {res.json('Thanks for stopping by...');});
app.post('/signin', signin.handleSignIn(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.put('/image', image.handleImage(db));
app.post('/fetchClarifaiApi', image.handleApiCall(clarifai));


// start the server
app.listen(3001, () => {
   console.log('Server running on port 3001.');
});