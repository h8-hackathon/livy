const { getDb } = require('../config/db')

/**
 * @typedef {Object} Todo
 * @property {string} text
 * @property {Sender?} sender
 * @property {Date} time
 * 
 */


/**
 * @typedef {Object} TodoSchema
 * @property {number} UserId
 * @property {Array<Todo>} todos
 *
 */

/**
 * @type {import('mongodb').Collection<TodoSchema>}
 */
const Todo = getDb().collection('Todos')

module.exports = Todo
