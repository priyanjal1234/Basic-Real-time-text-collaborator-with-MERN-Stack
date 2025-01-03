import { io } from "socket.io-client";

const socket = io("https://basic-real-time-text-collaborator-with.onrender.com",{
    withCredentials: true,
    autoConnect: false
})

export const connectSocket = function() {
    if(!socket.connected) {
        socket.connect()
    }
}

export const disconnectSocket = function() {
    if(socket.connected) {
        socket.disconnect()
    }
}

export default socket
