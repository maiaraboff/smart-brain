const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : '',
      password : '',
      database : 'smart-brain'
    }
});

const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

// / -> res = this is working
app.get('/',(req,res) => {res.send(database.users)})

// /signin -> POST = sucess/fail
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

// /register -> POST = user
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})

// /profile/:id -> GET = user
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)})

// /image -> PUT = user
app.put('/image', (req,res) => {image.handleImage(req,res,db)})

// /imageUrl -> POST = user
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})

/*
/ -> res = this is working
/signin -> POST = sucess/fail
/register -> POST = user
/profile/:userId -> GET = user
/image -> PUT = user
*/