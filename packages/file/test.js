var test = require('tape')
  , New = require('limbs-core')
  , File = require('.')
  , resolve = require('path').resolve
  , fs = require('fs')
  , rimrafSync = require('rimraf').sync

const ROOT = resolve(__dirname, '.sample')

const SAMPLE =
  [ [ 'dir_A'
    , [ 'dir_AA'
      , [ 'file_AA1',    'value1' ] ]
      , [ 'dir_AB'
        , [ 'file_AB1',  'value2' ]
        , [ 'file_AB2',  'value3' ] ]
      , [ 'file_A1',     'value4' ] ]
  , [ 'dir_B'
    , [ 'file_B1',       'value5' ] ]
  , [ 'file_1',          'value6' ]
  , [ 'file_2',          'value7' ] ]

// const Directory = require('../src/DirectoryFactory')
// const LocalFileSystem = require('../src/traits/LocalFileSystem')

// const { Set, Map } = require('immutable')
// const { BehaviorSubject } = require('rxjs')
// const { take, filter } = require('rxjs/operators')
// const { sleep, climb, waitForSnapshot, waitForStatus } = require('../src/helpers')

// const ROOT = resolve(__dirname, '.sample')

// const SAMPLE =
//   [ [ 'dir_A'
//     , [ 'dir_AA'
//       , [ 'file_AA1',    'value1' ] ]
//       , [ 'dir_AB'
//         , [ 'file_AB1',  'value2' ]
//         , [ 'file_AB2',  'value3' ] ]
//       , [ 'file_A1',     'value4' ] ]
//   , [ 'dir_B'
//     , [ 'file_B1',       'value5' ] ]
//   , [ 'file_1',          'value6' ]
//   , [ 'file_2',          'value7' ] ]

// describe('the LocalFileSystem directive', ()=>{

//   const FS_CONFIG = { cwd: ROOT, glob: '**/*', snapshot: false, load: false, watch: false }

//   let expectedURIs = Set()

//   beforeAll(()=>{
//     jasmine.addMatchers(require('jasmine-immutable-matchers'))
//     rimrafSync(ROOT)
//     mkdirSync(ROOT)
//     climb(SAMPLE, createDir, createFile) })

//   afterAll(()=>{
//     rimrafSync(ROOT) })

//   it('creates a metadata snapshot at startup', async (done)=>{
//     const $ = Directory(
//       // LogToConsole(),
//       LocalFileSystem({ ...FS_CONFIG, snapshot: true, load: true }))
//     await waitForSnapshot($)
//     expect(Set($.contents.keys())).toEqualImmutable(expectedURIs)
//     done() })

//   xit('is checked by fs/loader', async (done)=>{
//     let $ = Directory(
//       LocalFileSystem({ ...FS_CONFIG, snapshot: true, load: true }))
//     let checkedURIs = Set()
//     $.events
//       .pipe(
//         filter(([event])=>event==='FileChecked'),
//         take(expectedURIs.size))
//       .subscribe({
//         next (file) {
//           checkedURIs = checkedURIs.add(file.uri)
//           expect(file.meta instanceof Object).toBe(true)
//           expect(file.meta.fs instanceof Stats).toBe(true)
//           if (file.uri.split('/').reverse()[0].startsWith('dir_')) {
//             expect(file.meta.fs.isDirectory()).toBe(true)
//           } else if (file.uri.split('/').reverse()[0].startsWith('file_')) {
//             expect(file.meta.fs.isFile()).toBe(true)
//             expect(file.meta.fs.size).toBe('valueX'.length) } },
//         complete () {
//           expect(checkedURIs).toEqualImmutable(expectedURIs)
//           done() } }) })

//   xit('loads data from the filesystem upon request', async ()=>{
//     let $ = Directory(
//       LocalFileSystem({ ...FS_CONFIG, snapshot: true, load: true }))
//     await waitForSnapshot($)
//     expect(await $.get('file_1')).toBe('value6')
//     expect(await $.get('dir_B/file_B1')).toBe('value5')
//     expect(await $.get('dir_A/dir_AB/file_AB2')).toBe('value3') })

//   xit('can watch files for changes', async ()=>{

//     let $

//     const URI      = 'file_1'
//         , PATH     = resolve(ROOT, 'file_1')
//         , OLD_VAL  = 'value6'
//         , NEW_VAL  = 'updated'
//         , OUTDATED = 'CHANGE'
//         , LOADED   = 'LOADED'

//     // watch off

//     $ = Directory(LocalFileSystem({ ...FS_CONFIG, snapshot: true, load: true }))
//     await waitForSnapshot($)
//     expect(await $.get(URI)).toBe(OLD_VAL)

//     writeFileSync(PATH, NEW_VAL)
//     expect(await $.get(URI)).toBe(OLD_VAL)

//     writeFileSync(PATH, OLD_VAL)
//     expect(await $.get(URI)).toBe(OLD_VAL)

//     // watch on

//     $ = Directory(LocalFileSystem({ ...FS_CONFIG, snapshot: true, load: true, watch: true }))
//     await waitForSnapshot($)
//     expect(await $.get(URI)).toBe(OLD_VAL)

//     writeFileSync(PATH, NEW_VAL)
//     await waitForStatus($, OUTDATED, URI)
//     expect(await $.get(URI)).toBe(NEW_VAL)
//     // TODO expect($.contents.getValue().get(URI).meta.fs.size).toBe(NEW_VAL.length)

//     await sleep(100)
//     writeFileSync(PATH, OLD_VAL)
//     await waitForStatus($, OUTDATED, URI)
//     expect(await $.get(URI)).toBe(OLD_VAL)
//     // TODO expect($.contents.getValue().get(URI).meta.fs.size).toBe(OLD_VAL.length)

//   })

//   xit('can watch the directory for new files', ()=>{
//   })

//   xit('can watch the directory for deleted files', ()=>{
//   })

//   function createDir (node, current) {
//     const path = [...current, node[0]].join('/')
//     mkdirSync(resolve(ROOT, [...current, node[0]].join('/')))
//     expectedURIs = expectedURIs.add(path) }

//   function createFile (node, current) {
//     const path = [...current, node[0]].join('/')
//     writeFileSync(resolve(ROOT, [...current, node[0]].join('/')), node[1])
//     expectedURIs = expectedURIs.add(path) }

// })

