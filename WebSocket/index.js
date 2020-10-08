const http = require("http");
const WebSocketServer = require("websocket").server
let connection = null;


//create http-server
const httpServer = http.createServer((req,res) =>{
    console.log("We've received a request");
});

//create a websocket handshake
const websocket = new WebSocketServer({
    "httpServer":httpServer
})

websocket.on("request", request=> {

    connection = request.accept(null, request.origin)
    connection.on("open", () => console.log("Opened!!!"))
    connection.on("close", () => console.log("CLOSED!!!"))
    connection.on("message", message => {

        console.log(`Received message ${message.utf8Data}`)
        connection.send(`got your message: ${message.utf8Data}`)
    })
    sendEvery5Sec()
});

httpServer.listen(8080,()=> console.log("Server is listening on port 8080"));

function sendEvery5Sec(){
    connection.send('Iam server number ${Math.random()}');
    setTimeout(sendEvery5Sec, 5000);
}