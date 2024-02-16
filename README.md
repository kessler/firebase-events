# firebase-events

A simple library to send events to firestore database

## general usage

```js

const { open } = require('@kessler/firebase-events')
const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

exports.helloWorld = onRequest((req, res) => {
  const { newEvent, updateEvent } = await open('events')  
  const startEvent = newEvent('start', { functionName: 'helloWorld', type: 'start'})

  logger.info('Hello logs!', { structuredData: true })

  updateEvent(startEvent, { type: 'end' })
})

```

## timer

```js

const { open } = require('@kessler/firebase-events')
const { onRequest } = require('firebase-functions/v2/https')
const logger = require('firebase-functions/logger')

exports.helloWorld = onRequest(async (req, res) => {
  const { timer } = await open()
  const timerEvent = timer('function_duration', { fnName: 'helloWorld2' })
  logger.info('Hello logs!', { structuredData: true })
  await timerEvent.send()
})

```




1. enable firestore database in your firebase project
2. npm install @kessler/firebase-events
3. update your function code
4. deploy your function

