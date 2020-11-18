import io from 'socket.io-client';
import peer  from './peer'

let socketId: string;

interface IHandshake {
    id: string;
    handshake: string;
}

function joinRoom(room: string, onConnected: () => void) {
    const socket = io('http://localhost:8082');
    
    socket.on('connection', (payload: unknown) => {
        console.log('Connected socket', { payload });
    })

    socket.on('message', (payload: unknown ) => {
        console.log('message', { payload });
        // ...
    })

    socket.on(`announce`, (payload: unknown  ) => {
        console.log('announce',{ payload })
    })

    socket.on(`handshake`, (payload: IHandshake) => {
        console.log('handshake',{ payload,socketId,room })
        socketId = payload.id
        if (payload.handshake.search(/fromId/) >= 0){
            peer.ConsumeHandshake(payload.handshake);
        } else {
            console.log('WHAT IS THIS', payload)
        }
    })

    socket.on(`joined`, (id: string) => {
        socketId = id
        console.log('Joined',socketId )
        // socket.join(`dm/${id}`)
        // socket.broadcast.to(`dm/${id}`).emit('message','GET IT')
        // initiateHandshake(socket, socketId, room)
        peer.InitiateConnection()
        //inititate handshake to socketId
    })

    socket.emit('join', room)

    peer.onGeneratedHandshake = (handshake: string)=>{
        console.log('onGeneratedHandshake', socketId,handshake)
        socket.emit('handshake', {id:socketId,handshake,room})
    }

    peer.onStateChanged(evt => {
        console.log(`peer connection onStateChanged`, evt, peer);
        // console.log('connectionState',evt.target.connectionState)

        onConnected();
    });
    

}


export default joinRoom