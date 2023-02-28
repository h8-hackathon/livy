## Schedule Service

Disini schedule service menghandle schedule antara user dan counselor.

- status: string
- CounselorId: integer
- UserId: integer
- time: time
- note: text
- rating: integer

### Endpoint
- `GET /schedules/:userId`
- `GET /schedules/:counselorId`
- `POST /schedules/:userId`
- `PUT /schedules/:userId`
- `DELETE /schedules/:userId`

### `GET /schedules/:userId`
- mendapatkan list schedules dari user

### Request
params:
```json
{
  "userId": "integer"
}
```

### Response
200 Ok:
```json
[
  {
    "status": "string",
    "CounselorId": "integer",
    "time": "time",
    "note": "text",
    "rating": "integer"
  }
]
```

### `GET /schedules/:counselorId`
- mendapatkan list schedules dari counselor

### Request
params:
```json
{
  "counselorId": "integer"
}
```

### Response
200 Ok:
```json
[
  {
    "status": "string",
    "UserId": "integer",
    "time": "time",
    "note": "text",
    "rating": "integer"
  }
]
```

### `POST /schedules/:userId`
- membuat schedules baru untuk user

### Request
body:
```json
{
  "status": "string",
  "CounselorId": "integer",
  "time": "time",
  "note": "text",
  "rating": "integer"
}
```

### Response
201 Created:
```json
{
  "message": "successfully created"
}
```

### `PUT /schedules/:userId`
- update schedules dari user

### Request
body:
```json
{
  "status": "string",
  "CounselorId": "integer",
  "time": "time",
  "note": "text",
  "rating": "integer"
}
```

### Response
200 Ok:
```json
{
  "message": "successfully updated"
}
```

### `DELETE /schedules/:userId`
- delete schedules dari user

### Request
params:
```json
{
  "userId": "integer"
}
```

### Response
200 Ok:
```json
{
  "message": "successfully deleted"
}
```

