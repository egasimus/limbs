module.exports = data =>
  require('js-yaml').safeDump(data, { skipInvalid: true, flowLevel: 0, condenseFlow: false })
