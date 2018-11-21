module.exports = (obj, name, value) =>
  Object.defineProperty(obj, name, { enumerable: true, get: () => value })
