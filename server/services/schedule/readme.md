## Schedule Service

Disini schedule service menghandle schedule antara user dan counselor.

### Endpoint
- `GET /schedules/user/:userId`
- `GET /schedules/counselor/:counselorId`
- `POST /schedules/:userId`
- `PUT /schedules/:userId`
- `DELETE /schedules/:userId`

### `GET /schedules/user/:userId`
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
    "status": "pending",
    "CounselorId": 4,
    "session": "2023-03-01T18:04:49.310Z",
    "note": null,
    "rating": null,
    "paymentUrl": null,
    "expPaymentUrl": null,
    "createdAt": "2023-03-01T18:04:49.311Z",
    "updatedAt": "2023-03-01T18:04:49.311Z",
    "UserId": 3,
    "Counselor": {
      "id": 4,
      "name": "test",
      "email": "conselor@mail.com",
      "gender": null,
      "dob": null,
      "image": null,
      "role": "counselor",
      "helpful": 0,
      "createdAt": "2023-03-01T18:04:49.305Z",
      "updatedAt": "2023-03-01T18:04:49.305Z"
    }
  }
]

```

### `GET /schedules/counselor/:counselorId`
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
    "status": "pending",
    "CounselorId": 4,
    "session": "2023-03-01T18:04:49.310Z",
    "note": null,
    "rating": null,
    "paymentUrl": null,
    "expPaymentUrl": null,
    "createdAt": "2023-03-01T18:04:49.311Z",
    "updatedAt": "2023-03-01T18:04:49.311Z",
    "UserId": 3,
    "User": {
      "id": 3,
      "name": "test user",
      "email": "test@mail.com",
      "gender": null,
      "dob": null,
      "image": null,
      "role": "user",
      "helpful": 0,
      "createdAt": "2023-03-01T18:04:49.270Z",
      "updatedAt": "2023-03-01T18:04:49.270Z"
    }
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

### `DELETE /schedules/:scheduleId`
- delete schedules dari user

### Request
params:
```json
{
  "scheduleId": "integer"
}
```

### Response
200 Ok:
```json
{
  "message": "successfully deleted"
}
```

