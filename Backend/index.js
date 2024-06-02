require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const setupWebSocket = require('./routes/websocket');

connectToMongo();
const app = express();
var cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

const port = 3003;
app.use(express.json());
app.use('/settlement', require('./routes/settlement'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Setup WebSocket
setupWebSocket();

app.listen(port, () => {
    console.log(`iNotebook backend listening on port http://localhost:${port}`);
});
