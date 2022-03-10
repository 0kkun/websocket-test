import ws from 'ws';
import WebSocket from 'ws';
import { WsRequest, Connections } from './entity/Type';

// 環境変数読み込み
const env = process.env
const WEBSOCKET_PORT: number = Number(env.NODE_PORT) || 3000;
// 疎通を確認する間隔
const PING_INTERVAL_SEC: number = 10;
// リクエスト者を宛先に含めるか
const IS_INCLUDE_MYSELF: boolean = true;
// 接続コントロール用
let connectedCount: number = 0;
let connections: Connections[] = [];

// ログ設定
const log4js = require('log4js')
log4js.configure('./src/config/local/log4js.config.json')
const logger = log4js.getLogger('access')

// サーバー起動
const server = new ws.Server({port: WEBSOCKET_PORT})
logger.info(`Socketサーバー起動... [ENV:${env.NODE_ENV}]`)

/**
 * Websocket connection
 */
server.on('connection', ws => {
    try {
        logger.info(`Running PORT : ${WEBSOCKET_PORT}`)

        /** 疎通確認を一定間隔で行う (接続維持) */
        let interval = startPing(ws);

        /*** message event ***/
        ws.on('message', (message: string) => {
            const request: WsRequest = JSON.parse(message);
            const userId = Number(request.userId) ?? undefined;
            logger.info(`userId:${userId} からメッセージを受信しました。`);

            saveConnectionInfo(userId, ws, interval);
            connectedCount = connections.length;
            logger.info(`現在の接続数: ${connectedCount}`);
            sendMessageAll(request, userId);
        })

        /*** close event ***/
        ws.on('close', (event: number) => {
            // ping用タイマーを停止
            stopPingTimer(connections, ws)
            // コネクション情報から接続が切れた通信を削除
            checkTheConnection();
            connectedCount = connections.length;
            logger.info(`クライアントからの接続が閉じられました。現在の接続数:${connectedCount}, ReasonStatusCode:${event}`);
        });

        /*** disconnect event ***/
        ws.on('disconnect', () => {
            // ping用タイマーを停止
            stopPingTimer(connections, ws)
            // コネクション情報から接続が切れた通信を削除
            checkTheConnection();

            connectedCount = connections.length;
            logger.info(`クライアントからの接続が切れました。現在の接続数:${connectedCount}`);
        })

        /*** error event ***/
        ws.on('error', (event) => {
            logger.error(event);
        })

    } catch (exception) {
        logger.error(exception);
    }
});

/**
 * 接続情報を記憶する
 * @param userId 
 * @param currentWs 
 * @param interval 
 */
function saveConnectionInfo(userId: number, currentWs: WebSocket, interval: NodeJS.Timeout): void {
    let isExist = connections.some(connect => { return connect.ws === currentWs });
    if (!isExist) {
        connections.push({
            userId: userId,
            ws: currentWs,
            interval: interval,
        })
        logger.info("コネクション情報を保存しました。")
    }
}

/**
 * 接続者全員にデータを送る
 * @param connects 
 * @param reqData 
 * @param logMessage 
 * @param userId 
 * @returns void
 */
function sendMessageAll(reqData: any, userId: number): void {
    // 接続していないconnectionは除外する
    checkTheConnection();

    connections.forEach((connect: Connections) => {
        if (connect.userId !== userId || IS_INCLUDE_MYSELF) {
            connect.ws.send(JSON.stringify(reqData));
            logger.info(`userId:${connect.userId}へメッセージを送信しました。`);
        }
    });
}

/**
 * 接続を確認し、切れていたらリストから削除して返す
 * @param connects 
 * @returns Connections[]
 */
function checkTheConnection() {
    // コネクション情報から接続が切れた通信を削除
    connections = connections.filter(function (connect: Connections, _: any) {
        return connect.ws.readyState === ws.OPEN;
    });
}

/**
 * 接続が切れたpingタイマーをストップする
 * @param connects
 * @param ws 
 */
function stopPingTimer(connects: Connections[], ws: WebSocket): void {
    let timer = connects.filter(function (conn: Connections, _: any) {
        return (conn.ws === ws) ? true : false;
    }).shift()?.interval;
    if (timer !== undefined) {
        logger.info('Pingタイマーを停止させました。');
        clearInterval(timer);
    }
}

/**
 * ping送信開始する
 * @param currentWs 
 * @returns 
 */
function startPing(currentWs: WebSocket): NodeJS.Timeout {
    return setInterval(() => {
        if (currentWs.bufferedAmount == 0) {
            currentWs.ping();
        } else {
            currentWs.close();
            logger.info("Pingが送信できなくなった為、接続を閉じます。")
        }
    }, 1000 * PING_INTERVAL_SEC);
}