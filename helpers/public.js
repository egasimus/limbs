module.exports = function Public (obj) {
  return function Public (current = {}) {
    return Object.assign(current, obj) } }
