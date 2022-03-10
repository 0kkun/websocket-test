import WebSocket from "ws"

export type WsRequest = {
    userId: number,
    data: object,
}

export type Connections = {
    userId: number,
    ws: WebSocket,
    interval: NodeJS.Timeout;
}