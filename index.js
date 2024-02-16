const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')

try {
  initializeApp({
    credential: applicationDefault()
  })    
} catch (e) {
  console.error(e)
  console.error('You must run this function in a firebase environment')
}

async function open({ collectionName = 'events', environment = 'cloud-function' } = {}) {
  if (environment !== 'cloud-function') {
    throw new Error('environment must be cloud-function')
  }

  const db = getFirestore()

  return {
    db,
    newEvent,
    updateEvent,
    timer
  }

  async function newEvent(data) {
    const docRef = db.collection(collectionName).doc()
    
    await docRef.set({
      ...data,
      created: Timestamp.now()
    })

    return docRef
  }

  async function updateEvent(id, data = {}) {
    if (typeof id === 'object') {
      id = id.id
    }

    const docRef = db.collection(collectionName).doc(id)
    
    await docRef.update({
      ...data,
      updated: Timestamp.now()
    })

    return docRef
  }

  function timer(eventName, data = {}) {
    const start = Date.now()

    return {
      send: async () => {
        const end = Date.now()
        const duration = end - start
        return newEvent({ eventName, duration, start, end, ...data })
      }
    }
  }
}

module.exports = {
  open
}

// async function main() {
//   const { db, newEvent, updateEvent } = await open()
//   const event = await newEvent({ type: 'xkjas' })
//   await updateEvent(event.id, { end: Timestamp.now() })
// }

// main()