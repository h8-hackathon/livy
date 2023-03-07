
const { getDb } = require('../config/db')

/**
 * @typedef {Object} ForumCommentSchema
 * @property {string} forumPostId
 * @property {number} UserId
 * @property {string} text
 * @property {Array<number>} helpful
 * 
 */

/**
 * @type {import('mongodb').Collection<ForumCommentSchema>}
 */
const ForumComment = getDb().collection('ForumComments')

module.exports = ForumComment