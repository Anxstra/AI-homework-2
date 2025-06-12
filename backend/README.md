# Placeholder API

This project is a REST API that replicates the behavior and structure of https://jsonplaceholder.typicode.com, with extended support for full REST operations, JWT-based authentication, structured user data storage, and containerized deployment.

## Technologies Used

- Java 17
- Spring Boot
- Maven
- PostgreSQL
- Docker
- JWT

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository
2. Navigate to the `backend` directory
3. Package the application by running `mvn package`
4. Run `docker-compose up -d`

The application will be running on port 8080.

## API Endpoints

### Authentication

- `POST /authenticate`: Authenticate a user and get a JWT token.

### Users

- `GET /users`: Get all users.
- `GET /users/{id}`: Get a user by id.
- `POST /users`: Create a new user.
- `PUT /users/{id}`: Update a user.
- `DELETE /users/{id}`: Delete a user.

## Authentication

To access the protected endpoints, you need to get a JWT token by sending a POST request to `/authenticate` with the following body:

```json
{
    "email": "Sincere@april.biz",
    "password": "password"
}
```

Then, you need to include the token in the `Authorization` header of your requests:

```
Authorization: Bearer <token>
```

## API Usage (cURL examples)

### Authenticate

```bash
curl -X POST http://localhost:8080/authenticate \
-H "Content-Type: application/json" \
-d '{
    "email": "Sincere@april.biz",
    "password": "password"
}'
```

### Get All Users

```bash
curl -X GET http://localhost:8080/users \
-H "Authorization: Bearer <your_token>"
```

### Get User by ID

```bash
curl -X GET http://localhost:8080/users/1 \
-H "Authorization: Bearer <your_token>"
```

### Create User

```bash
curl -X POST http://localhost:8080/users \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
    "name": "New User",
    "username": "newuser",
    "email": "new@user.com",
    "password": "password"
}'
```

### Update User

```bash
curl -X PUT http://localhost:8080/users/1 \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
    "name": "Updated User Name"
}'
```

### Delete User

```bash
curl -X DELETE http://localhost:8080/users/1 \
-H "Authorization: Bearer <your_token>"
``` 