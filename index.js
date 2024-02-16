const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore, Timestamp } = require('firebase-admin/firestore')

async function open(environment = 'cloud-function') {
  if (environment !== 'cloud-function') {
    throw new Error('environment must be cloud-function')
  }

  initializeApp({
    credential: applicationDefault()
  })
  
  const db = getFirestore()

  return {
    db,
    newEvent,
    updateEvent
  }

  async function newEvent(data) {
    const docRef = db.collection('events').doc()
    
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

    const docRef = db.collection('events').doc(id)
    
    await docRef.update({
      ...data,
      updated: Timestamp.now()
    })

    return docRef
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