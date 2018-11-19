module.exports = exports = New
module.exports.default = New
function New(){
  return Array.prototype.reduce.call(arguments,add,{public:{}}).public
  function add(core,trait){
    if(!trait)return core
    if(typeof trait=='function'){
      var updated=trait.bind(core)(function(trait){add(core,trait)})
      return(updated&&typeof updated==='object')?updated:core}
    if(typeof trait=='object'){
      core.public=core.public||{}
      Object.keys(trait).forEach(function(key){core.public[key]=trait[key]})
      return core}}}
