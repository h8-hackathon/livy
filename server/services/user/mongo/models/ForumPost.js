const { getDb } = require('../config/db')

/**
 * @typedef {Object} ForumPostSchema
 * @property {string} title
 * @property {Array<string>} images
 * @property {string} caption
 * @property {number} UserId
 * @property {Array<number>} helpful
 * 
 */

/**
 * @type {import('mongodb').Collection<ForumPostSchema>}
 */
const ForumPost = getDb().collection('ForumPosts')

module.exports = ForumPost