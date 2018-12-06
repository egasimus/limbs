module.exports = {

  Datum (datum) {
    return { type: 'Datum', id: require('shortid').generate(), t: new Date(), datum }
  },

  Topic (id, ...data) {
    return { type: 'Topic', id, data }
  },

  Window (id, topic, viewer, dimensions) {
    return { type: 'Window', id, topic, viewer, dimensions }
  },

  Command (command) {
    return { type: 'Command', command }
  }

}
