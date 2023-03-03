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

- `PUT //comments/:commentId` 
- `DELETE /comments/:commentId` 

- `PUT /posts/:postId/helpful` 
- `DELETE /posts/:postId/helpful` 

- `PUT /comments/:commentId/helpful`
- `DELETE /comments/:commentId/helpful`

### `GET /posts`

- mendapatkan list posts

#### Request

query:

```json
{
  "page": "integer",
  "sortBy": "string",
  "limit": "integer"
}
```

#### Response

200 Ok:

```json
{
  "dataPage": {
    "totalPage": "string",
    "currentPage": "string",
    "nextPage": "boolean",
    "prevPage": "boolean"
  },
  "result" :[
    {
    "id": "integer",
    "title": "string",
    "images": ["string"],
    "caption": "text",
    "UserId": "integer",
    "helpful": ["integer"],
    "createdAt": "time"
  }
  ]
}

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
  "createdAt": "time"
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
  "helpful": ["integer"]
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
  "postId": "string"
}
```

#### Response

200 Ok:

```json
[
  {
    "_id": "string",
    "forumPostId": "string",
    "text": "string",
    "UserId": "integer",
    "helpful": ["integer"],
    "createdAt": "time"
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
  "forumPostId": "string",
  "UserId": "integer",
  "text": "string",
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

### `PUT /comments/:commentId`

- update comments

#### Request

params:

```json
{
  "postId": "string",
  "commentId": "string"
}
```

body:

```json
{
  "text": "string"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully updated"
}
```

### `DELETE /comments/:commentId`

- delete comments

#### Request

params:

```json
{
   "postId": "string",
  "commentId": "string"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully deleted"
}
```

### `PUT /posts/:postId/helpful`

- menambahkan user id ke helpful

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
  "UserId": "integer"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully updated"
}
```

### `DELETE /posts/:postId/helpful`

- menghapus user id dari helpful

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
  "UserId": "integer"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully updated"
}
```

### `PUT /comments/:commentId/helpful`

- menambahkan user id ke helpful

#### Request

params:

```json
{
  "commentId": "string"
}
```

body:

```json
{
  "UserId": "integer"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully updated"
}
```

### `DELETE /comments/:commentId/helpful`

- menghapus user id dari helpful

#### Request

params:

```json
{
  "commentId": "string"
}
```

body:

```json
{
  "UserId": "integer"
}
```

#### Response

200 Ok:

```json
{
  "message": "successfully updated"
}
```
