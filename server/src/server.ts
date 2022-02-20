import express from 'express';
import ws from 'ws';
import WebSocket from 'ws';

// 環境変数読み込み
const env = process.env
const WEBSOCKET_PORT: number = Number(env.NODE_PORT) || 3000;

// ログ設定
const log4js = require('log4js')
log4js.configure('./src/config/local/log4js.config.json')
const logger = log4js.getLogger('access')

// サーバー起動
const server = new ws.Server({port: WEBSOCKET_PORT})
logger.info(`Socket server is running... [ENV:${env.NODE_ENV}]`)

// 接続コントロール用
let connectedCount: number = 0;
let connections = [];

// 疎通を確認する間隔
const PING_INTERVAL_SEC = 10;

/**
 * Websocket connection
 */
server.on('connection', ws => {
    try {
        logger.info(`Running PORT : ${WEBSOCKET_PORT}`)

        /** 疎通確認を一定間隔で行う (接続維持) */
        let interval = setInterval(() => {
            if (ws.bufferedAmount == 0) {
                ws.ping();
            } else {
                ws.close();
                logger.info("Close socket because ping couldn't be sent.")
            }
        }, 1000 * PING_INTERVAL_SEC);

        /* message event */
        ws.on('message', (message: string) => {
            logger.info('Received a message from the client.');
            const request = JSON.parse(message);
            
        })

    } catch (exception) {
        console.error(exception)
    }
});