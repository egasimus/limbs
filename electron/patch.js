module.exports = emitter => {

  emitter.anyListeners = []

  const oldEmit = emitter.emit

  Object.entries({

    emit (...args) {
      const anyListeners = [...emitter.anyListeners]
      anyListeners.forEach(listener=>listener.apply(emitter, args)) },

    onAny (cb) {
      emitter.anyListeners.push(cb) },

    offAny (cb) {
      for (let i in emitter.anyListeners) {
        if (emitter.anyListeners[i] === cb) {
          x.splice(i, 1)
          break } } }

  }).forEach(([name, method])=>{
    emitter[name] = method.bind(emitter)
  })

}
