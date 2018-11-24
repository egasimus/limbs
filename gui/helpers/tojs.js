module.exports = data => data.map(datum => {
  return (datum && datum.toJS) ? datum.toJS() : datum
})
