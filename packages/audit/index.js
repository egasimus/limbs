module.exports = function AuditTrait (preprocess) {
  return function Audit () {
    if (this.events) {
      this.audit = this.events.subscribe(function (event) {
        event = preprocess(event)
        if (event) console.log(event) }) } } }

// TODO preexisting subscriptions
