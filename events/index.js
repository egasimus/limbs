module.exports = (current = {}) => {
  const { readOnly, addMethods } = current
  // create or inherit event stream
  const Events = current.Events || {
    stream: new (require('rxjs/internal/Subject').Subject)(),
    subscriptions: [] }
  // create public read-only accessors for config and methods
  if (!current.Events) readOnly(current, 'Events', Events)
  addMethods(require, './methods', current, 'Events') }
