const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const server = app.listen(process.env.PORT || 8080, (err) => {
    if (!err) {
        console.log(`Listenening on port ${process.env.PORT || 8080}`);
    }
    else {
        console.log(err);
    }
});

const io = require('socket.io')(server);

io.on('connection', async (socket) => {
    console.log('Client connected : ' + socket.id);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });

});


