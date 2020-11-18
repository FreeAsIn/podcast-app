// const io = require("socket.io")
// const server = io.listen(8081)

const { createImportSpecifier } = require("typescript");

const server = require("http").createServer(onRequest);
const io = require("socket.io")(server);

let clients = {}

function onRequest(req, res) {
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    });
};

io.on("connection", (socket) => {
    console.log('CONNECTION', socket.id)
    clients[socket.id] =  socket
    socket.on('join', (room) => {
        console.log('JOINED ROOM', room, socket.id)
        socket.room = room;
        socket.join(room)
        socket.broadcast.emit('joined', socket.id)

        // io.to(room).emit('announce', { msg: 'EVERYONE', id: socket.id, clients })
        // socket.emit('announce',{msg:'I JOINED emit',id:socket.id})
        // io.to(room).emit('announce',{msg:'EVERYONE',id:socket.id})
    })

    // socket.on("disconnect", () => {

    // })

    socket.on('message', message => {
        // console.log(server.clients)
        socket.broadcast.emit('message', message)
        console.log('received: %s', message, typeof message);
    });

    socket.on('handshake', payload => {
        console.log('ON HANDSHAKE from',socket.id)
        console.log('EMIT HANDSHAKE TO ',payload.id, payload, payload.room)
        io.to(payload.id).emit('handshake',{id:socket.id,handshake:payload.handshake})
        // io.socke(payload.id).emit('handshake',{id:socket.id,handshake:payload.handshake})
        // console.log(server.clients)
        // socket.broadcast.emit('message', message)
        // console.log('received: %s', message, typeof message);
    });



    socket.send('connection established');

})

server.listen(8082, () => { })
