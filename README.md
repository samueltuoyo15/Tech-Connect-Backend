# 🚀 Tech Connect

* 📌This is the official Tech Connect Backend Api Documentation im writing for the  Frontend Developer of Tech Connect [Emmanuel](https://github.com/emess2g)*
---

## 🛠 API Documentation  

### 1️⃣ Authentication Flow  

#### **Sign Up**  
📌 This section explains how to integrate the sign-up endpoint.  

- **Endpoint**:  
  ```http
  POST https://tech-connect-backend-vrz5.onrender.com/api/auth/signup
  ```

- **Request Body** *(JSON)*:  
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "your-secure-password"
  }
  ```

- **Response (Success)**:  
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "12345",
      "username": "johndoe",
      "email": "johndoe@example.com"
    }
  }
  ```

- **Response (Error)**:  
  ```json
  {
    "error": "Email already exists"
  }
  ```

---

### 2️⃣ Sign In  
📌 This endpoint allows a user to log in.  

- **Endpoint**:  
  ```http
  POST https://tech-connect-backend-vrz5.onrender.com/api/auth/login
  ```

- **Request Body** *(JSON)*:  
  ```json
  {
    "email": "johndoe@example.com",
    "password": "your-secure-password"
  }
  ```

- **Response (Success)**:  
  ```json
  {
    "message": "Login successful",
    "token": "your-jwt-token",
    "user": {
      "id": "12345",
      "username": "johndoe",
      "email": "johndoe@example.com"
    }
  }
  ```



