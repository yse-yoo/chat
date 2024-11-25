const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// Expressアプリケーションの作成
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

// Socket.IOの接続
io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');

    // クライアントからのメッセージを受信
    socket.on('message', (msg) => {
        console.log('メッセージ受信: ', msg);
        socket.broadcast.emit('message', msg); // 全クライアントにオブジェクト形式でブロードキャスト
    });

    socket.on('disconnect', () => {
        console.log('ユーザーが切断されました');
    });
});

// サーバーを起動
server.listen(PORT, () => {
    console.log(`Socket.IOサーバーが起動しました: http://${HOST}:${PORT}`);
});