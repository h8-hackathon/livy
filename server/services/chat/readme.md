## Chat Service

Disini chat service menghandle chat dari user ke counselor dan user ke livy.

### Endpoint

- `GET /chats/:userId`
- `POST /chats/:userId`
- `POST /chats/:userId/livy`

### `GET /chats/:userId`

- mendapatkan list chats dari user

Request:

```json
{
  "userId": "integer"
}
```

Response:
200 Ok:

```json
[
  {
    "time": "time",
    "text": "string",
    "sender": {
      "id": "number",
      "name": "string"
    }
  }
]
```

### `POST /chats/:userId`

- membuat chats baru untuk user

Request:

```json
{
  "counselorId": "number",
  "chat": {
    "time": "time",
    "text": "string",
    "sender": {
      "id": "number",
      "name": "string"
    }
  }
}
```

Response:
201 Created:

```json
{
  "message": "successfully created"
}
```

### `POST /chats/:userId/livy`

- membuat chats baru untuk user dengan livy

Request:

```json
{
  "time": "time",
  "text": "string",
  "sender": {
    "id": "number",
    "name": "string"
  }
}
```
OR
```json
{}
```

Response:
201 Created:

```json
{
  "message": "successfully created"
}
```
