module.exports = function AuditTrait (preprocess) {
  return function Audit (state = {}) {
    const { Events, Audit } = state
    if (!Events) throw new Error(`'Events' missing in ${Object.keys(state)}`)
    if (Audit) Audit.unsubscribe()
    state.Audit = Events.stream.subscribe(event => {
      event = preprocess(event)
      event && console.log(event) })
    return state } }

// TODO preexisting subscriptions
