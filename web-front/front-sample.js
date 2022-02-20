const endPoint = 'ws://localhost:443';
let sendBottun = document.getElementById('sendMessage');
let clearBottun = document.getElementById('clearMessage');
let pingFlg;

// websocket
let sock = new WebSocket(endPoint);

/* 接続イベント */
sock.onopen = (e) => {
alert('Socket接続に成功しました');
}

/* エラーイベント */
sock.onerror = (err) => {
    alert(`Socketエラーが発生しました`);
    console.log(err)
}
/* クローズイベント */
sock.onclose = (e) => {
    alert(`Socketが閉じられました`);
}

// サーバーからデータを受け取った
sock.onmessage = (message) => {
console.log(message.data);
if (message.data.indexOf('ping') !== -1) {
    if (!pingFlg) {
    document.getElementById('socket-connect').insertAdjacentHTML('beforebegin', `ping接続中<br><hr>`);
    pingFlg = true;
    }
} else {
    document.getElementById('messageReceived').insertAdjacentHTML('beforebegin', `${message.data}<br><hr>`);
}
}

// メッセージをサーバーに送る
sendBottun.addEventListener('click', () => {
let message = document.getElementById('message').value;
let userId = document.getElementById('userId').value;
let userIdDest = document.getElementById('userIdDestination').value;
target = document.getElementById('target').value;

if (target === 'SEND_ALL') {
    let request = JSON.stringify({
    userId: userId,
    target: target,
    // data: { message: message }
    data: {
        socketType: 'STATUS',
        message: 'this is status update request'
    }
    });
    sock.send(request);
}

if (target === 'SEND_SPECIFIC') {
    let request = JSON.stringify({
    userId: userId,
    target: target,
    data: {
        toUserIds: [{userId: userIdDest}],
        data: {message: message} 
    }
    });
    sock.send(request);
}

if (target === "SEND_POS") {
    let request = JSON.stringify({
    userId: userId,
    target: target,
    data: {
        isMeeting: true,
        position: { row: 2, column: 4 },
        userId: userId,
        userName: "test"
    }
    });
    sock.send(request);
}

if (target === "GET_POS") {
    let request = JSON.stringify({
    userId: userId,
    target: target,
    data: {}
    });
    sock.send(request);
}
});

// メッセージを消去する
clearBottun.addEventListener('click', () => {
    document.getElementById('message').value = '';
});