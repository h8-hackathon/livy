## Forum Service
Disini forum service menghandle user ForumPost dan ForumComment.


### Endpoint
- `GET /posts` /done
- `POST /posts` /done
- `GET /posts/:postId` /done
- `PUT /posts/:postId` /done
- `DELETE /posts/:postId` /done

- `GET /posts/:postId/comments` /progress
- `POST /posts/:postId/comments` /progress
- `PUT /posts/:postId/comments/:commentId` /progress
- `DELETE /posts/:postId/comments/:commentId` /progress

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
    "UserId": "integer",
    "helpful": ["integer"],
    "createdAt": "time",
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
  "UserId": "integer",
  "helpful": ["integer"]
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
  "postId": "string"
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
  "helpful": ["integer"],
  "createdAt": "time",
}
```

### `PUT /posts/:postId`
- update posts

#### Request
params:
```json
{
  "postId": "string"
}
```

body:
```json
{
  "title": "string",
  "images": ["string"],
  "caption": "text",
  "UserId": "integer",
  "helpful": ["integer"],
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
  "postId": "string"
}
```

#### Response
200 Ok:
```json
{
  "message": "successfully deleted"
}
```

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
  }
]
```

### `POST /posts/:postId/comments`
- membuat comments baru

#### Request
params:
```json
{
  "postId": "string"
}
```

body:
```json
{
  "text": "string",
  "UserId": "integer",
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









