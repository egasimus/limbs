module.exports = (current, topic, ...data) => {
  const { store }        = current.Redux
      , { Datum, Topic } = require('./actions')
  store.dispatch(Topic(topic,
    ...data.map(datum=>store.dispatch(Datum(datum)).id))) }
