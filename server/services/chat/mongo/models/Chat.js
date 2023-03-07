
const { getDb } = require('../config/db')

/**
 * @typedef {Object} Sender
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} text
 * @property {Sender?} sender
 * @property {Date} time
 * 
 */


/**
 * @typedef {Object} ChatSchema
 * @property {number} UserId
 * @property {string} text
 * @property {Array<ChatMessage>} chats
 *
 */

/**
 * @type {import('mongodb').Collection<ChatSchema>}
 */
const Chat = getDb().collection('Chats')

module.exports = Chat
