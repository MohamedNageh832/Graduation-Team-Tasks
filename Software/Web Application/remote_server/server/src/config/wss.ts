import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (ws) => {
  ws.on("error", console.log);
  ws.on("message", (msg, isBinary) => {
    wss.clients.forEach((client) => {
      client.send(msg, { binary: isBinary });
    });
  });

  ws.send("Hello clienty");
});
