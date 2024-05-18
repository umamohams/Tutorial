require('dotenv').config();
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    console.log("I cam first here auth")
 const token = req.headers['authorization'];
 if (!token) return res.status(402).end();
 console.log(token)
 jwt.verify(token, process.env.SECRET, (err, user) => {
 if (err) return res.status(403).end();
 req.user = user;
 next();
 });
};