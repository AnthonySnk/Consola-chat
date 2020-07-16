let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});


http.listen("wss://0cvzgb8kn9.execute-api.us-east-1.amazonaws.com/beta", () => {
    console.log('Listening on port *: 3000');
});


io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

});