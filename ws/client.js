module.exports = current => {

  if (current.WSIPC.client) current.WSIPC.client.unsubscribe()
  current.WSIPC.client = require('rxjs/webSocket').webSocket(
    { url:          'ws+unix:///tmp/limbs.sock'
    , serializer:    value => require('../helpers/yaml')(value)
    , deserializer:  event => require('js-yaml').safeLoad(event.data)
    , WebSocketCtor: require('ws')})
  current.WSIPC.client.subscribe(message=>current.WSIPC.onMessage(message))
  current.WSIPC.client.next(['GetServerDeps'])

}
