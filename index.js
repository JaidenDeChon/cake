const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// TODO - Db stuff
// const messages = require('./db/messages');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.json({
        message: 'Testing testing'
    });
});

// TODO - Db stuff
// app.get('/messages', (request, response) => {
//     messages.getAll().then((messages) => {
//         response.json(messages);
//     });
// });

app.post('/messages', (request, response) => {
    const newDbObject = request.body;
    console.log(newDbObject.name);
    response.status(200).send();
    // TODO - Db stuff
    // messages.create(request.body).then((message) => {
    //     response.json(message);
    // }).catch((error) => {
    //     response.status(500);
    //     response.json(error);
    // });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});
