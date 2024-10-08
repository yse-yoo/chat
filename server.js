const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Expressアプリケーションの作成
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost", // クライアントのオリジンを許可
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// Socket.IOの接続
io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    // クライアントからのメッセージを受信
    socket.on('chat message', (msg) => {
        console.log('メッセージ受信: ' + msg);
        socket.broadcast.emit('chat message', msg);
        // 全クライアントにメッセージをブロードキャスト
    });

    socket.on('disconnect', () => {
        console.log('ユーザーが切断されました');
    });
});

// サーバーを起動
server.listen(3000, () => {
    console.log('Socket.IOサーバーがポート3000で起動しました');
});
