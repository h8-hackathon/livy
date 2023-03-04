### Daily Service

#### Endpoint
- `POST /todos`
- `GET /todos/:userId`
- `PUT /todos/:userId`

#### `POST /todos`
- membuat todos baru untuk user
Request:
```json
{
  "userId": "integer",
  "todos": [
    {
      "activity": "string",
      "completed": "boolean"
    }
  ]
}
```

Response:
201 Created:
```json
{
  "message": "successfully created"
}
```

#### `GET /todos/:userId`
- mendapatkan list todos dari user

Request:
```json
{
  "userId": "integer"
}
```

Response:
200 Ok:
```json
{
  "todos": [
    {
      "activity": "string",
      "completed": "boolean"
    }
  ]
}
```

#### `PUT /todos/:userId`
- update todos dari user

Request:
```json
{
  "userId": "integer",
  "todos": [
    {
      "activity": "string",
      "completed": "boolean"
    }
  ]
}
```

Response:
200 Ok:
```json
{
  "message": "successfully updated"
}
```

#### `DELETE /todos/:userId`
- delete todos dari user

Request:
```json
{
  "userId": "integer"
}
```

Response:
200 Ok:
```json
{
  "message": "successfully deleted"
}
```


