const db = require('./postgres');
const bcrypt = require('bcryptjs');
module.exports = {
    async getUser(request) {
        const username = request.body.username
        const sql = 'SELECT * FROM Users WHERE username = $1';
        const result = await db.query(sql, [username]);
        const user = result.rows;
        return user[0].user_password;
    },

    async register(request) {
        const saltRounds = 10;
        const { username, password} = request.body
        console.log("came here to hash")

        bcrypt.hash(password, saltRounds, async (err, hash)  =>  {
            if (err) {
                console.error(err.message);
                return;
            }
        
            console.log('Hashed password:', hash);
            const sql = 'INSERT INTO Users (username, user_password) VALUES ($1, $2) RETURNING *';
            const result = await db.query(sql, [username, hash]);
        });
        return "Blog added with username: ${username}",[username];
    },

};