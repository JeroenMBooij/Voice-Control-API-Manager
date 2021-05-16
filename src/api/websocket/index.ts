import * as http from 'http';
import { Server } from "ws";

export default function(server: http.Server): void {

    const websocket = new Server({server});

    websocket.on('connection', (websocket)  => {
        
        websocket.on("message", (message) => {
            broadcast(message.toString());
        });

        websocket.send("Hi there");
    });

    function broadcast(message: string) {
        websocket.clients.forEach(function each(client) {
            client.send(message);
         });
     };

    console.log("🚀 Websocket Created.");
};