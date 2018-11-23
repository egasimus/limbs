module.exports = (...args) => {
  console.log(args)
  return require('limbs-core/do').expandStep(...args)
}
