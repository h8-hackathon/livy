
const { getDb } = require('../config/db')

/**
 * @typedef {Object} Slot
 * @property {Date} startTime
 * @property {Date} endTime
 */

/**
 * @typedef {Object} Availability
 * @property {string} dayOfWeek
 * @property {Array<Slot>} slots
 *
 */

/**
 * @typedef {Object} AvailabilitySchema
 * @property {number} UserId
 * @property {Array<Availability>} availability
 */

/**
 * @type {import('mongodb').Collection<AvailabilitySchema>}
 */
const Availability = getDb().collection('Availabilities')

module.exports = Availability

/**
 * Example query
 * 
 * 

Availability.find({
  doctorId: ObjectId("doctor-id-here"),
  "Availability.dayOfWeek": "Monday",
  "Availability.slots": {
    $elemMatch: {
      startTime: { $gte: ISODate("2023-03-05T10:00:00.000Z") },
      endTime: { $lte: ISODate("2023-03-05T14:00:00.000Z") }
    }
  }
})

 */
