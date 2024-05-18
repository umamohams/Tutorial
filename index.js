const express = require('express')
const app = express()
const { body, validationResult } = require('express-validator')
const port = 3000

let data = [
    {"date": "24/04/2024", "title": "Cricket", "body": "I love cricket", "UUID": "1" },
    {"date": "25/04/2024", "title": "Football", "body": "I love football", "UUID": "2" },
    {"date": "26/04/2024", "title": "Baseball", "body": "I love baseball", "UUID": "3" },
]

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port, () => {
    console.log(`Server is running at: http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.status(200).json(data);
});

app.get("/id/:id", function (req, res) {
    let found = data.find(function (item) {
        console.log(parseInt(req.params.id))
        console.log(parseInt(item.UUID))
        console.log((parseInt(item.UUID) === parseInt(req.params.id)))

        return (parseInt(item.UUID) === parseInt(req.params.id));
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});


app.post('/',  [
    [
      body("date").notEmpty(),
      body("title").notEmpty(),
      body("body").notEmpty(),
    ],
  ], function (req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    let items = data.map(item => item.id);

    let newId = items.length + 1

    let newItem = {
        date: req.body.date,
        title: req.body.title,
        body: req.body.body,
        UUID: newId.toString()
    }

    data.push(newItem);

    res.status(201).json({
        'message': "successfully created"
    });
});

app.put('/id/:id',  [
    [
      body("date").notEmpty(),
      body("title").notEmpty(),
      body("body").notEmpty(),
    ],
  ], function (req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 

    let found = data.find(function (item) {
        return (parseInt(item.UUID) === parseInt(req.params.id));
    });
    if (found) {
        let updateData = {
            date: req.body.date,
            title: req.body.title,
            body: req.body.body,
            UUID: found.UUID
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updateData);

        res.status(201).json({ 'message': "data updated" });
    } else {
        res.status(404).json({
            'message': 'unable to insert data because data inserted not matched'
        });
    }
});

app.delete('/delete/:id', function (req, res) {
    let found = data.find(function (item) {
        return (parseInt(item.UUID) === parseInt(req.params.id));
    });
    if (found) {
        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

