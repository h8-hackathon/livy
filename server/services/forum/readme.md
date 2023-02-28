## Forum Service
Disini forum service menghandle user ForumPost dan ForumComment.


### Endpoint
- `GET /posts`
- `POST /posts`
- `GET /posts/:postId`
- `PUT /posts/:postId`
- `DELETE /posts/:postId`
- `GET /posts/:postId/comments`
- `POST /posts/:postId/comments`
- `PUT /posts/:postId/comments/:commentId`
- `DELETE /posts/:postId/comments/:commentId`
- `PUT /posts/:postId/helpfull`
- `DELETE /posts/:postId/helpfull`
- `PUT /posts/:postId/comments/:commentId/helpfull`
- `DELETE /posts/:postId/comments/:commentId/helpfull`


### `GET /posts`
- mendapatkan list posts

#### Request
query:
```json
{
  "page": "integer",
  "sortBy" : "string",
  "limit": "integer"
}
```

#### Response
200 Ok:
```json
[
  {
    "id": "integer",
    "title": "string",
    "images": ["string"],
    "caption": "text",
    "userId": "integer",
    "helpfull": ["integer"],
    "createdAt": "time",
    "updatedAt": "time"
  }
]
```

### `POST /posts`
- membuat posts baru

#### Request
body:
```json
{
  "title": "string",
  "images": ["string"],
  "caption": "text",
  "userId": "integer",
  "helpfull": ["integer"]
}
```

#### Response
201 Created:
```json
{
  "message": "successfully created"
}
```

### `GET /posts/:postId`
- mendapatkan detail posts

#### Request
params:
```json
{
  "postId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "id": "integer",
  "title": "string",
  "images": ["string"],
  "caption": "text",
  "userId": "integer",
  "helpfull": ["integer"],
  "createdAt": "time",
  "updatedAt": "time"
}
```

### `PUT /posts/:postId`
- update posts

#### Request
params:
```json
{
  "postId": "integer"
}
```

body:
```json
{
  "title": "string",
  "images": ["string"],
  "caption": "text",
  "userId": "integer",
  "helpfull": ["integer"]
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `DELETE /posts/:postId`
- delete posts

#### Request
params:
```json
{
  "postId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully deleted"
}
```

- text: string
- userId: integer
- helpfull: [inetger]

### `GET /posts/:postId/comments`
- mendapatkan list comments dari posts diurutkan berdasarkan helpfull terbanyak

#### Request
params:
```json
{
  "postId": "integer"
}
```

#### Response
200 Ok:
```json
[
  {
    "id": "integer",
    "text": "string",
    "userId": "integer",
    "helpfull": ["integer"],
    "createdAt": "time",
    "updatedAt": "time"
  }
]
```

### `POST /posts/:postId/comments`
- membuat comments baru

#### Request
params:
```json
{
  "postId": "integer"
}
```

body:
```json
{
  "text": "string",
  "userId": "integer",
  "helpfull": ["integer"]
}
```

#### Response
201 Created:
```json
{
  "message": "successfully created"
}
```

### `PUT /posts/:postId/comments/:commentId`
- update comments

#### Request
params:
```json
{
  "postId": "integer",
  "commentId": "integer"
}
```

body:
```json
{
  "text": "string",
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `DELETE /posts/:postId/comments/:commentId`
- delete comments

#### Request
params:
```json
{
  "postId": "integer",
  "commentId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully deleted"
}
```

### `PUT /posts/:postId/helpfull`
- menambahkan user id ke helpfull

#### Request
params:
```json
{
  "postId": "integer"
}
```

body:
```json
{
  "userId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `DELETE /posts/:postId/helpfull`
- menghapus user id dari helpfull

#### Request
params:
```json
{
  "postId": "integer"
}
```

body:
```json
{
  "userId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `PUT /posts/:postId/comments/:commentId/helpfull`
- menambahkan user id ke helpfull

#### Request
params:
```json
{
  "postId": "integer",
  "commentId": "integer"
}
```

body:
```json
{
  "userId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `DELETE /posts/:postId/comments/:commentId/helpfull`
- menghapus user id dari helpfull

#### Request
params:
```json
{
  "postId": "integer",
  "commentId": "integer"
}
```

body:
```json
{
  "userId": "integer"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```









