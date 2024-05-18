require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./postgres');
const model = require('./model');
const jwt = require("jsonwebtoken");
const router = require('express').Router();

function makeToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}

router.post('/login', async (req, res) => {
    console.log("I came second here is to login")
    console.log(req.body.username + " " + req.body.password)
   try {
        const pass = await model.getUser(req);
        console.log(pass)

        bcrypt.compare(req.body.password, pass, async (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return;
            }
        
        if (result) {
            res.json({ token: makeToken({ username: req.body.username }) });
            console.log('Passwords match! User authenticated.');
        } else {
            console.log('Passwords do not match! Authentication failed.');
            res.status(401).end();
        }
        });
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});


router.post('/register', async (req, res) => {
    console.log("I came second here is to register")
    console.log(req.body.username + " " + req.body.password)
    try {
        const user = await model.register(req);
        res.status(200).json(user);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});


module.exports = router;