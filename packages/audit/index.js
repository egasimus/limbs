module.exports = function AuditTrait () {
  return function Audit () {
    if (this.events) {
      this.audit = this.events.subscribe(function (event) {
        console.log(event) }) } } }
