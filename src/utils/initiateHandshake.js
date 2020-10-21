import { Peer } from '@freeasin/rtc-connect'

const peer = new Peer({ defaultDataChannel: "myChannel" })

function initiateHandshake(socket, socketId) {
    console.log('initiateHandshake', socket)
    socket.on('handshake', (payload) => {
        console.log('on handshake', { payload });
        if (payload.search(/fromId/) >= 0){
            peer.ConsumeHandshake({ rawHandshake: payload });
        } else {
            console.log('WHAT IS THIS', payload)
        }
    })

    peer.InitiateConnection()

    peer.onGeneratedHandshake = (handshake)=>{
        console.log('EMIT HANDSHAKE', handshake)
        socket.emit('handshake', {id:socketId,handshake})
    }

    peer.onStateChanged  = (evt=>{
        console.log('peerConnection_onStateChanged',evt)
    })

}


export default initiateHandshake