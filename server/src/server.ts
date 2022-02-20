import express from 'express';
import ws from 'ws';
import WebSocket from 'ws';

const WEBSOCKET_PORT = 3000;

// const app = express();
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
const server = new ws.Server({port: WEBSOCKET_PORT});

/**
 * Websocket connection
 */
server.on('connection', ws => {
    try {
        console.log(process.env.NODE_ENV);

            /* message event */
    ws.on('message', (message: string) => {
        console.log('receive message from client!');
    })

    } catch (exception) {
        console.error(exception);
    }
});