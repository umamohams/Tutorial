const db = require('./postgres');
module.exports = {
    async getBlogs() {
        const sql = `SELECT * FROM blog`;
        const result = await db.query(sql);
        return result.rows;
    },

    async addBlogs(request) {
        const { date, title, body} = request.body
        const uuid = (await this.getBlogs()).length + 1
        const sql = 'INSERT INTO blog (date, title, body, uuid) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await db.query(sql, [date, title, body, uuid]);
        return "Blog added with ID: ${uuid}",[uuid];
    },

    async deleteBlogs(id) {
        const sql = 'DELETE FROM blog WHERE uuid = $1';
        const result = await db.query(sql, [id]);
        return "Blog deleted with UUID: ${id}",[id];
    },

    async updateBlogs(request, id) {
        const { date, title, body} = request.body
        const sql = 'UPDATE blog SET date = $1, title = $2 body = $3 WHERE uuid = $4';
        const result = await db.query(sql, [date, title, body, id]);
        return "Blog modified with UUID: ${id}",[id];
    },

    async getBlogWithId(id) {
        const sql = 'SELECT * FROM blog WHERE uuid = $1';
        const result = await db.query(sql, [id]);
        return result.rows;
    },





};