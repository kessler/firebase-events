# firebase-events

A simple library to send events to firestore database

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