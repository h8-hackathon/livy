
const { getDb } = require('../config/db')

/**
 * @typedef {Object} Todo
 * @property {string} activity
 * @property {boolean} completed
 * 
*/


/**
 * @typedef {Object} TodoSchema
 * @property {number} UserId
 * @property {Date} updatedAt
 * @property {Array<Todo>} todos
 *
 */

/**
 * @type {import('mongodb').Collection<TodoSchema>}
 */
const Todo = getDb().collection('Todos')

module.exports = Todo
