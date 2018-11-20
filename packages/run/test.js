var New = require('limbs-core')
  , Run = require('.')
const Run = require('../src/traits/Run')
const LocalFileSystem = require('../src/traits/LocalFileSystem')
const { sleep } = require('../src/helpers')

const { resolve } = require('path')
const { mkdirSync, writeFileSync, readFileSync } = require('fs')
const { sync: rimrafSync } = require('rimraf')
const ROOT = resolve(__dirname, '.sample_run')
const PATH = resolve(ROOT, 'test.js')

describe('the Run directive', ()=>{

  it('runs one sync function defined in-place, and emits RunComplete', (done)=>{
    let ran = false
    const $ = New(Run((...args)=>{
      expect(args[0]).toBe($)
      expect(args[1]).toEqual({})
      ran=true }))
    $.on('RunComplete', ()=>{
      expect(ran).toBe(true)
      done() }) })

  it('runs one async function defined in-place and emits RunComplete', (done)=>{
    let ran = false
    const $ = New(Run(async(...args)=>{
      expect(args[0]).toBe($)
      expect(args[1]).toEqual({})
      await sleep(500)
      ran=true }))
    $.on('RunComplete', ()=>{
      expect(ran).toBe(true)
      done() }) })

  it('runs one sync function from a file and emits RunComplete', (done)=>{
    rimrafSync(ROOT)
    mkdirSync(ROOT)
    writeFileSync(PATH, 'module.exports = () => ({ ran: true })')
    const $ = New(
      // [ 'LogToConsole' ],
      LocalFileSystem({ cwd: ROOT }),
      // [ 'RunInThisContext' ],
      Run('test.js'))
    $.on('RunComplete', ([_, result])=>{
      expect(result.ran).toBe(true)
      rimrafSync(ROOT)
      done() }) })

  it('runs one async function from a file and emits RunComplete', (done)=>{
    rimrafSync(ROOT)
    mkdirSync(ROOT)
    writeFileSync(PATH, 'module.exports = () => Promise.resolve({ ran: true })')
    const $ = New(
      // [ 'LogToConsole' ],
      LocalFileSystem({ cwd: ROOT }),
      // [ 'RunInThisContext' ],
      Run('test.js'))
    $.on('RunComplete', ([_, result])=>{
      expect(result.ran).toBe(true)
      rimrafSync(ROOT)
      done() }) })

  xit('responds to runtime changes to files with/without debounce', ()=>{
    expect(false).toBe(true)
  })

  xit('runs sync/async functions in parallel/sequence from declaration/file', (done)=>{
    const RUN_TREE =
      [ syncD
      , asyncD
      , 'syncF'
      , 'asyncF'
      , [ 'asyncF', 'syncF', asyncD, syncD ]
      , [ [ asyncD
          , syncD
          , 'syncF'
          , 'asyncF' ] ]
      , [ [ 'syncF'
          , [ 'asyncF', asyncD ]
          , [ syncD, 'syncF' ]
          , [ 'asyncF' ] ]
        , [ asyncD
          , [ syncD, 'asyncF' ]
          , syncD ]
        ]
      ]
    const directory = New([ 'Run', ...RUN_TREE ])
    expect(false).toBe(true)
  })

})

