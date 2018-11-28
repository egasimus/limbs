module.exports = current => {

  current.WSIPC.onConnection = ws =>
    ws.on('message', message => current.WSIPC.onMessage(ws, message))

  if (current.WSIPC.httpServer) current.WSIPC.httpServer.close()
  current.WSIPC.httpServer = require('http').createServer()

  if (current.WSIPC.wsServer) current.WSIPC.wsServer.close()
  current.WSIPC.wsServer = new (require('ws').Server)(
    { server: current.WSIPC.httpServer })

  current.WSIPC.httpServer.listen('/tmp/limbs.sock')
  current.WSIPC.wsServer.on('connection', ws => current.WSIPC.onConnection(ws)) }
