module.exports = predicate => {

  if (typeof predicate === 'function') {
    return predicate }

  if (typeof predicate === 'string') {
    return (p=>([event])=>p===event)(predicate) }

  if (predicate[Symbol.iterator]) {
    return (p=>(event)=>p.every((item,index)=>{
      return require('is-regex')(item)
        ? item.test(event[index])
        : item===event[index] }))(predicate) }

  throw new Error(`could not conform predicate ${predicate}`) }
