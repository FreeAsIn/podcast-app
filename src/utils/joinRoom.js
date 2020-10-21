import io from 'socket.io-client.js';
import peer  from './peer'
let socketId
function joinRoom(room) {
    const socket = io('http://localhost:8082');
    
    socket.on('connection', (payload) => {
        console.log('Connected socket', { payload });
    })

    socket.on('message', (payload) => {
        console.log('message', { payload });
        // ...
    })

    socket.on(`announce`, (payload) => {
        console.log('announce',{ payload })
    })

    socket.on(`handshake`, (payload) => {
        console.log('handshake',{ payload,socketId })
        socketId = payload.id
        if (payload.handshake.search(/fromId/) >= 0){
            peer.ConsumeHandshake(payload.handshake);
        } else {
            console.log('WHAT IS THIS', payload)
        }
    })

    socket.on(`joined`, (id) => {
        socketId = id
        console.log('Joined',socketId )
        // socket.join(`dm/${id}`)
        // socket.broadcast.to(`dm/${id}`).emit('message','GET IT')
        // initiateHandshake(socket, socketId, room)
        peer.InitiateConnection()
        //inititate handshake to socketId
    })

    socket.emit('join', room)

    peer.onGeneratedHandshake = (handshake)=>{
        console.log('onGeneratedHandshake', socketId,handshake)
        socket.emit('handshake', {id:socketId,handshake})
    }


    peer.onStateChanged  = (evt=>{
        console.log('onStateChanged',evt)
    })

}


export default joinRoom