import express from 'express';
import ws from 'ws';
import WebSocket from 'ws';

const env = process.env
const WEBSOCKET_PORT = 3000

const log4js = require('log4js')
log4js.configure('./src/config/local/log4js.config.json')
const logger = log4js.getLogger('access')

const server = new ws.Server({port: WEBSOCKET_PORT})
logger.info(`Socket server is running... [ENV:${env.NODE_ENV}]`)

/**
 * Websocket connection
 */
server.on('connection', ws => {
    try {
        console.log(process.env.NODE_ENV)

            /* message event */
    ws.on('message', (message: string) => {
        console.log('receive message from client!')
    })

    } catch (exception) {
        console.error(exception)
    }
});