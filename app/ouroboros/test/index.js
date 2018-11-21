import test from 'ava'
import { Application } from 'spectron'

const LAUNCHER = require.resolve('dothot/launcher')
const ENTRYPOINT = require('path').resolve(__dirname, '..', 'src', 'dothot.config.js') 

test.beforeEach(async t => {
  const app = t.context.app = new Application({
    path: require('electron'),
    args: [ LAUNCHER, ENTRYPOINT ] })
  await app.start() })

test.afterEach.always(async t => {
  const { app } = t.context
  const logs = await app.client.getRenderProcessLogs()
  logs.forEach(({ level, message })=>console.log(`\n${level} ${message}`))
  await app.stop()
})

test('the app starts in a 800x600 window', async(t)=>{
  try {
  const { app } = t.context
  const { client, browserWindow } = app
  await client.waitUntilWindowLoaded()
  const { width, height } = await app.browserWindow.getBounds()
  t.is(width,  800)
  t.is(height, 600)
  browserWindow.on('dom-ready', async()=>{
    t.is(await client.getText('body'), 'Loading...')
    t.end()
  })
  } catch (e) { console.log(e) }
})
