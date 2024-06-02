const WebSocket = require('ws');
const Settlement = require('../models/settlement');
const { MongoClient } = require('mongodb');

const mongoUrl = 'mongodb://localhost:27017/?replicaSet=rs0';
const dbName = 'test';
const collectionName = 'Settlement';

const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const setupWebSocket = async () => {
    try {
        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const changeStream = collection.watch();
        const wss = new WebSocket.Server({ port: 8080 });

        wss.on('connection', async (ws) => {
            const latestRecord = await Settlement.find().sort({ createdAt: -1 }).limit(1);
            if (latestRecord.length > 0) {
                ws.send(JSON.stringify(latestRecord[0]));
            }

            changeStream.on('change', (change) => {
                if (change.operationType === 'insert') {
                    ws.send(JSON.stringify(change.fullDocument));
                }
            });
        });
    } catch (err) {
        console.error('Error setting up WebSocket server:', err);
    }
};

module.exports = setupWebSocket;
