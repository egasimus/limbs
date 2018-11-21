var test = require('tape')
  , New = require('limbs-core')
  , Reload = require('.')

test('refresh require cache', function (t) {
})

//const { resolve } = require('path')
//const { mkdirSync, writeFileSync, readFileSync } = require('fs')
//const { sync: rimrafSync } = require('rimraf')

//const { waitForSnapshot } = require('../src/helpers')
//const { filter } = require('rxjs/operators')

//const ROOT = resolve(__dirname, '.sample_require')
//const PATH = resolve(ROOT, 'test.js')

//const Public = require('limbs').Public
//const DirectoryFactory = require('../src/DirectoryFactory')
//const LocalFileSystem = require('../src/traits/LocalFileSystem')
//const LogToConsole = require('../src/traits/LogToConsole')
//const UpdateRequireCache = require('../src/traits/UpdateRequireCache')

//describe('the UpdateRequireCache directive', ()=>{

//  beforeAll(()=>{
//    rimrafSync(ROOT)
//    mkdirSync(ROOT)
//    writeFileSync(PATH, 'module.exports = 1') })

//  afterAll(()=>{
//    rimrafSync(ROOT) })

//  it('receives signals from the Directory to refresh the require.cache', async(done)=>{
//    const $ = require('../src/DirectoryFactory')(
//      //LogToConsole(),
//      Public({ cwd: ROOT }),
//      LocalFileSystem({ cwd: ROOT }),
//      UpdateRequireCache )
//    await waitForSnapshot($)
//    expect(Object.keys(require.cache).indexOf(PATH)).toBe(-1)
//    expect(require(PATH)).toBe(1)
//    expect(Object.keys(require.cache).indexOf(PATH) > -1).toBe(true)
//    writeFileSync(PATH, 'module.exports = 2')
//    $.on('RemovedFromRequireCache', ()=>{
//      expect(Object.keys(require.cache).indexOf(PATH)).toBe(-1)
//      const x = require(PATH)
//      expect(Object.keys(require.cache).indexOf(PATH) > -1).toBe(true)
//      expect(x).toBe(2)
//      done()
//    })
//  })

//})

