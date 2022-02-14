import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import postNotification from './courier/postNotification.js';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// TODO - Db stuff for site admin
// const messages = require('./db/messages');

// Application processes
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToIndex = path.join(__dirname, 'client', 'build');

console.log(pathToIndex);

app.use(express.static(pathToIndex));
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.sendFile('index.html');
});

// TODO - Db stuff for site admin
// app.get('/messages', (request, response) => {
//     messages.getAll().then((messages) => {
//         response.json(messages);
//     });
// });

app.post('/messages', (request, response) => {
    const newDbObject = request.body;

    console.log(`should be posting ${JSON.stringify(newDbObject)}`);

    postNotification(newDbObject).then(response.status(200).send());

    // TODO - Db stuff for site admin
    // messages.create(request.body).then((message) => {
    //     response.json(message);
    // }).catch((error) => {
    //     response.status(500);
    //     response.json(error);
    // });

    response.status(200).send();
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});
