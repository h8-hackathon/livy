## Admin Service

### Enpoints

posts

- `GET /posts`
- `GET /posts/:id`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
  counselors
- `GET /counselors`
- `PATCH /counselors/:id`
- `DELETE /counselors/:id`
  reports
- `GET /reports`
- `POST /reports`
- `DELETE /reports:id`

### `GET /posts`

- mendapat list postingan, dan tidak perlu authorization

#### Request

query:

```json
{
  "type": "article | podcast | video" // kalo type tidak diatur akan return all
}
```

Dan untuk sorting, diurutkan berdasarkan `createdAt` yg terbaru

#### Response

200 Ok

```json
[
  {
    "title": "string",
    "url": "string",
    "caption": "string",
    "type": "string",
    "UserId": "integer"
  }
]
```

### `POST /posts`

- membuat postingan baru oleh Admin

### Request

body:

```json
{
  "title": "string",
  "url": "string",
  "caption": "string",
  "type": "string",
  "UserId": "integer"
}
```

### Response

201 Ok:

```json
{
  "message": "Success created ${newPost.title}"
}
```

### `GET /posts/:id`

- mendapatkan detail postingan

### Request

params:

```json
{
  "id": "integer"
}
```

### Response

200 Ok:

```json
{
  "title": "string",
  "url": "string",
  "caption": "string",
  "type": "string",
  "UserId": "integer"
}
```

### `PUT /posts/:id`

- mengubah postingan

### Request

params:

```json
{
  "id": "integer"
}
```

body:

```json
{
  "title": "string",
  "url": "string",
  "caption": "string",
  "type": "string",
  "UserId": "integer"
}
```

### Response

200 Ok:

```json
{
  "message": "Success updated ${findPost.title}"
}
```

### `DELETE /posts/:id`

- menghapus postingan

### Request

params:

```json
{
  "id": "integer"
}
```

### Response

200 Ok:

```json
{
  "message": "Success deleted ${findPost.title}"
}
```

### `GET /counselors`

- mendapatkan list counselor

### Request

query:

```json
{
  "page": "integer",
  "limit": "integer",
  "search": "string"
}
```

### Response

200 OK

```json
[
  {
    "name": "string",
    "email": "string",
    "gender": "string",
    "dob": "Date",
    "image": "string",
    "role": "string", // (superadmin | admin | user | counselor)
    "helpfull": "number"
  }
]
```

### `PATCH /counselors/:id`

- mengubah counselor status

### Request

params:

```json
{
  "id": "integer"
}
```

body:

```json
{
  "status": "string" // (accepted | pending)
}
```

### Response

200 Ok:

```json
{
  "message": "Success update status counselor"
}
```

### `DELETE /counselors/:id`

- menghapus counselor

### Request

params:

```json
{
  "id": "integer"
}
```

### Response

200 Ok:

```json
{
  "message": "Success deleted counselor"
}
```

### `GET /reports`

- mendapatkan list report

### Request

query:

```json
{
  "page": "integer",
  "limit": "integer",
  "search": "string"
}
```

### Response

200 OK

```json
[
  {
    "ReporterId": "integer",
    "postId": "string",
    "commentId": "string",
    "note": "text"
  }
]
```

### `POST /reports`

- membuat report baru

### Request

body:

```json
{
  "ReporterId": "integer",
  "postId": "string",
  "commentId": "string",
  "note": "text"
}
```

### Response

201 Ok:

```json
{
  "message": "Success report"
}
```

### `DELETE /reports`

- menghapus report

### Request

body:

```json
{
  "ReporterId": "integer",
  "postId": "string",
  "commentId": "string",
  "note": "text"
}
```

### Response

200 Ok:

```json
{
  "message": "Success deleted"
}
```
