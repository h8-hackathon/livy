# User Service

### Endpoint
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`
- `PATCH /users/:id`


### `GET /users`
- Mendapatkan list users
#### Request:
Query:
```json
{
  "page": number,
  "limit": number,
  "search": string
}
```

#### Response:
```json
[
  {
    "name": "string",
    "email": "string",
    "gender": "string",
    "dob": "Date",
    "image": "string",
    "role": "string". // (superadmin | admin | user | counselor)
    "helpfull": "number",
  }
]
```

### `GET /users/:id`
- Mendapatkan info user

#### Response:
200 OK:
```json
{
  "name": "string",
  "email": "string",
  "gender": "string",
  "dob": "Date",
  "image": "string",
  "role": "string". // (superadmin | admin | user | counselor)
  "helpfull": "number",
}
```



### `POST /users`
- untuk register atau login dalam 1 Endpoint

#### Request:
Header (optional) :
```json
{
  "access_token": "string"
}
```
disini `access_token` optional, dan hanya dipakai ketika signup user as admin dan access token harus yg punya role superadmin

Body: 
```json
{
  "token": "token dari google",
  "role": "superadmin | admin | user | counselor"
}
```
disini role bertujuan untuk menerima signup roel jika belum ada email tsb di dalam table user, juga sudah ada, berfungsi untuk mencocokan dengan role di data usernya

#### Response:
Success Login (200 - OK):
```json
{
  "access_token": "string"
}
```
Success Signup (201 - Created):
```json
{
  "access_token": "string"
}
```


### `PUT /users/:id`
- untuk merubah data dalam user
#### Request:
Header: 
```json
{
  "access_token": "string"
}
```
jadi parameter `:id` harus sesuai dengan id dari access_token atau kalau rolenya admin atau superadmin

Body: 
```json
{
  "name": "string",
  "email": "string",
  "gender": "string",
  "dob": "Date",
  "image": "string",
  "role": "string". // (superadmin | admin | user | counselor)
  "helpfull": "number",
}
```

#### Response:
200 OK:
```json
{
  "message": "successfuly updated"
}
```


### `DELETE /users/:id`
#### Request:
Header: 
```json
{
  "access_token": "string"
}
```
jadi parameter `:id` harus sesuai dengan id dari access_token atau kalau rolenya admin atau superadmin


#### Response:
200 OK:
```json
{
  "message": "successfuly deleted"
}
```

### `PATCH /users/:id`
- untuk merubah data helpful user
#### Request:
Header: 
```json
{
  "access_token": "string"
}
```
ini tidak ada authorization, hanya authentication

Body: 
```json
{
  "helpfull": -1,
}
```
Or
```json
{
  "helpfull": 1,
}
```

#### Response:
200 OK:
```json
{
  "message": "successfuly updated"
}
```

### Global Error:

400 Bad request:
```json
{
  "message": "string"
}
```

401 Unauthorized:
```json
{
  "message": "string"
}
```

403 Forbidden:
```json
{
  "message": "string"
}
```

404 Not found:
```json
{
  "message": "string"
}
```

500 Internal Server error:
```json
{
  "message": "string"
}
```
