const { connect, getDb, disconnect } = require('../config/db')

const migrateForumPosts = async () => {
  const db = getDb()

  await db.createCollection('ForumPosts', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['title', 'UserId'],
        properties: {
          title: {
            bsonType: 'string',
            description: 'Title must be a string and is required',
          },
          UserId: {
            bsonType: 'number',
            description: 'UserId must be an number and is required',
          },
          images: {
            bsonType: 'array',
            description: 'images must be an array',
            items: {
              bsonType: 'string',
              description: 'images must be an array of strings',
            },
          },
          caption: {
            bsonType: 'string',
          },
          helpful: {
            bsonType: 'array',
            description: 'helpful must be an array',
            items: {
              bsonType: 'number',
              description: 'helpful must be an array of numbers',
            },
          },
        },
      },
    },
  })
}

const migrateForumComments = async () => {
  const db = getDb()

  await db.createCollection('ForumComments', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['forumPostId', 'UserId', 'text'],
        properties: {
          forumPostId: {
            bsonType: 'string',
            description: 'forumPostId must be an string and is required',
          },
          UserId: {
            bsonType: 'number',
            description: 'UserId must be an number and is required',
          },
          text: {
            bsonType: 'string',
            description: 'text must be a string and is required',
          },
          helpful: {
            bsonType: 'array',
            description: 'helpful must be an array',
            items: {
              bsonType: 'number',
              description: 'helpful must be an array of numbers',
            },
          },
        },
      },
    },
  })
}

const migrateChats = async () => {
  const db = getDb()

  await db.createCollection('Chats', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['UserId', 'chats'],
        properties: {
          UserId: {
            bsonType: 'number',
            description: 'UserId must be an number and is required',
          },
          CounselorId: {
            bsonType: ['number', 'null'],
            description: 'CounselorId must be an number or null and is required',
          },
          chats: {
            bsonType: 'array',
            description: 'chats must be an array',
            items: {
              bsonType: 'object',
              required: ['time', 'text'],
              properties: {
                time: {
                  bsonType: 'date',
                  description: 'time must be a date and is required',
                },
                text: {
                  bsonType: 'string',
                  description: 'text must be a string and is required',
                },
                sender: {
                  bsonType: 'object',
                  required: ['UserId', 'name'],
                  properties: {
                    UserId: {
                      bsonType: 'number',
                      description: 'UserId must be an number and is required',
                    },
                    name: {
                      bsonType: 'string',
                      description: 'name must be a string and is required',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
}

const migrateTodos = async () => {
  const db = getDb()

  await db.createCollection('Todos', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['UserId', 'todos', 'updatedAt'],
        properties: {
          UserId: {
            bsonType: 'number',
            description: 'UserId must be an number and is required',
          },
          updatedAt: {
            bsonType: 'date',
            description: 'updatedAt is required',
          },
          todos: {
            bsonType: 'array',
            description: 'todos must be an array',
            items: {
              bsonType: 'object',
              required: ['activity', 'completed'],
              properties: {
                activity: {
                  bsonType: 'string',
                  description: 'activity must be a string and is required',
                },
                completed: {
                  bsonType: 'bool',
                  description: 'completed must be a boolean and is required',
                },
              },
            },
          },
        },
      },
    },
  })
}


const migrateAvailability = async () => {
  const db = getDb()

  await db.createCollection('Availabilities', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['UserId', 'availability'],
        properties: {
          UserId: {
            bsonType: 'number',
            description: 'UserId must be an number and is required',
          },
          availability: {
            bsonType: 'array',
            description: 'availability must be an array',
            items: {
              bsonType: 'object',
              required: ['dayOfWeek', 'slots'],
              properties: {
                dayOfWeek: {
                  bsonType: 'string',
                  description: 'dayOfWeek must be a string and is required',
                },
                slots: {
                  bsonType: 'array',
                  description: 'slots must be an array',
                  items: {
                    bsonType: 'object',
                    required: ['startTime', 'endTime'],
                    properties: {
                      startTime: {
                        bsonType: 'string',
                        description: 'startTime must be a string and is required',
                      },
                      endTime: {
                        bsonType: 'string',
                        description: 'endTime must be a string and is required',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })
}




const wrapper = async (fn) => {
  try {
    await fn()
  } catch (error) {
    if (error.codeName === 'NamespaceExists') {
      console.log('Migration already completed')
    } else {
      console.log(error)
      throw error
    }
  }
}

const main = async () => {
  try {
    await connect()
    await wrapper(migrateForumPosts)
    console.log('Migration Forum Posts completed')

    await wrapper(migrateForumComments)
    console.log('Migration Forum Comments completed')

    await wrapper(migrateChats)
    console.log('Migration Chats completed')

    await wrapper(migrateTodos)
    console.log('Migration Todos completed')

    await wrapper(migrateAvailability)
    console.log('Migration Availability completed')

  } catch (error) {
    console.log(error)
    process.exit(1)
  } finally {
    await disconnect()
  }
}

main()
