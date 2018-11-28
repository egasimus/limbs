module.exports = current => {

  current.WSIPC.onMessage = (socket, message) => {

    message = require('js-yaml').safeLoad(message)
    const [ type, ...args ] = message

    if (type === 'GetServerDeps') {
      const deps = Object.entries(current.Deps).reduce((deps, [ key, val ])=>{
        deps[key] = [...val]
        return deps }, {})
      socket.send(require('../helpers/yaml')([ 'ServerDeps', deps ])) }

  }
}
