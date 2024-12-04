# API Documentation: Book Management System

## Data Structure

Each book object contains the following fields:

```json
{
  "id": 1,
  "title": "Book Title",
  "author": "Author Name",
  "description": "Brief description of the book",
  "publicationDate": "YYYY-MM-DD",
  "coverImage": "https://covers.example.com/cover-id.jpg"
}
```

## 1. POST /login
Used for administrator login.

- **Description**: Authenticate with a username and password. If authentication is successful, a success message is returned (in the JWT version, a token is also returned).

- **Request**:
  - **URL**: `/login`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "password123"
    }
    ```

- **Response**:
  - **Success Response**:
    - **Status Code**: `200 OK`
    - **Response Body** (varies based on the version):
      1. **File-based authentication**:
         ```json
         {
           "message": "Login successful"
         }
         ```
      2. **JWT-based authentication**:
         ```json
         {
           "token": "your_jwt_token"
         }
         ```
  - **Error Response**:
    - **Status Code**: `401 Unauthorized`
    - **Response Body**:
      ```json
      {
        "message": "Invalid username or password"
      }
      ```

---

## 2. GET /books
Retrieve all books.

- **Description**: This endpoint allows any user to retrieve a list of books.

- **Request**:
  - **URL**: `/books`
  - **Method**: `GET`

- **Response**:
  - **Success Response**:
    - **Status Code**: `200 OK`
    - **Response Body** (example):
      ```json
      [
        {
          "id": 1,
          "title": "Book 1",
          "author": "Author 1",
          "description": "Description of Book 1",
          "publicationDate": "1851-10-18",
          "coverImage": "https://covers.example.com/cover1.jpg"
        },
        {
          "id": 2,
          "title": "Book 2",
          "author": "Author 2",
          "description": "Description of Book 2",
          "publicationDate": "1869-01-01",
          "coverImage": "https://covers.example.com/cover2.jpg"
        }
      ]
      ```

---
## 3. GET /books/:id
Retrieve a specific book by ID.

- **Description**: This endpoint allows any user to retrieve detailed information about a specific book by providing its unique ID.

- **Request**:
  - **URL**: `/books/:id`
  - **Method**: `GET`

- **Response**:
  - **Success Response**:
    - **Status Code**: `200 OK`
    - **Response Body** (example):
      ```json
      {
        "id": 1,
        "title": "Book 1",
        "author": "Author 1",
        "description": "Description of Book 1",
        "publicationDate": "1851-10-18",
        "coverImage": "https://covers.example.com/cover1.jpg"
      }
      ```
  - **Error Response** :
      - **Book Not Found**
      - **Status Code**: `404 Not Found`
      - **Response Body**:
        ```json
        {
          "message": "Book not found"
        }
        ```
---
## 4. POST /books
Add a new book (admin only).

- **Description**: Only logged-in administrators can add a new book.

- **Request**:
  - **URL**: `/books`
  - **Method**: `POST`
  - **Request Body**:
    ```json
    {
      "title": "New Book",
      "author": "Author Name",
      "description": "Book description",
      "publicationDate": "YYYY-MM-DD",
      "coverImage": "https://covers.example.com/newcover.jpg"
    }
    ```

- **Response**:
  - **Success Response**:
    - **Status Code**: `201 Created`
    - **Response Body**:
      ```json
      {
          "id": 3,
          "title": "New Book",
          "author": "Author Name",
          "description": "Book description",
          "publicationDate": "YYYY-MM-DD",
          "coverImage": "https://covers.example.com/newcover.jpg"
      }
      ```
  - **Error Response** :
    - **If not logged in for JWT-based authentication**
    - **Status Code**: `401 Unauthorized`
    - **Response Body**:
      ```json
      {
        "message": "Invalid user."
      }
      ```

---

## 5. PUT /books/:id
Update a book by its ID (admin only).

- **Description**: Allows an admin to update the details of a specific book by its ID.

- **Request**:
  - **URL**: `/books/:id`
  - **Method**: `PUT`
  - **Request Body**:
    ```json
    {
      "title": "Updated Book Title",
      "author": "Updated Author",
      "description": "Updated description",
      "publicationDate": "YYYY-MM-DD",
      "coverImage": "https://covers.example.com/newcover.jpg"
    }
    ```

- **Response**:
  - **Success Response**:
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
          "id": 1,
          "title": "Updated Book Title",
          "author": "Updated Author",
          "description": "Updated description",
          "publicationDate": "YYYY-MM-DD",
          "coverImage": "https://covers.example.com/newcover.jpg"
        }
      ```
  - **Error Response**
    - **If not logged in for JWT-based authentication**
    - **Status Code**: `401 Unauthorized`
    - **Response Body (example)**:
      ```json
      {
        "message": "Invalid user."
      }
      ```
    - **Book not found**
    - **Status Code**: `404 Not Found`
    - **Response Body (example)**:
      ```json
      {
        "message": "Book not found"
      }
      ```

---

## 6. DELETE /books/:id
Delete a book by its ID (admin only).

- **Description**: Only logged-in administrators can delete a book by its ID.

- **Request**:
  - **URL**: `/books/:id`
  - **Method**: `DELETE`

- **Response**:
  - **Success Response**:
    - **Status Code**: `204 No Content`
    - **Response Body**:
      ```json
      {
      }
      ```
  - **Error Response**
    - **If not logged in for JWT-based authentication**
    - **Status Code**: `401 Unauthorized`
    - **Response Body (example)**:
      ```json
      {
        "message": "Invalid user."
      }
      ```
    - **Book not found**  
    - **Status Code**: `404 Not Found`
    - **Response Body (example)**:
      ```json
      {
        "message": "Book not found"
      }
      ```

---

## Error Codes Summary
- **200 OK**: Request was successful.
- **201 Created**: Resource was successfully created.
- **401 Unauthorized**: Authentication failed (invalid credentials).
- **403 Forbidden**: Access denied (user is not authorized).
- **404 Not Found**: Resource not found (e.g., book with specified ID doesn't exist).
