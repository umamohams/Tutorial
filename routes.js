const model = require('./model');
const router = require('express').Router();
const { body, validationResult } = require('express-validator')

router.get('/blogs', async (req, res) => {
    try {
        const blogs = await model.getBlogs();
        res.status(200).json(blogs);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

router.get("/id/:id", async (req, res) => {

    try {
        const blog = await model.getBlogWithId(req.params.id);
        res.status(200).json(blog);
    } catch (e) {
        res.status(400).end();
    }
});

router.post("/",     [
    body("date").notEmpty(),
    body("title").notEmpty(),
    body("body").notEmpty(),
  ], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    try {
        const result = await model.addBlogs(req);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).end();
    }
});

router.put("/id/:id",     [
    body("date").notEmpty(),
    body("title").notEmpty(),
    body("body").notEmpty(),
  ], async (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    try {
        const result = await model.updateBlogs(req, req.params.id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).end();
    }
});

router.delete("/delete/:id", async (req, res) => {

    try {
        const result = await model.deleteBlogs(req.params.id);
        res.status(200).send(result);
    } catch (e) {
        res.status(400).end();
    }
});







module.exports = router;