/* istanbul ignore file */

const convertChatToPrompts = (chats) => {
  if (chats.length)
    return chats.map(el => {
      return `${el.sender?.name || 'livy'}: ${el.text?.replaceAll('\n', '')}`
    }).join('\n') + '\nlivy: '

  return ''
}

module.exports = { convertChatToPrompts }