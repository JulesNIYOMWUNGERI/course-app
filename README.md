# 📘 Course App

A full-stack web application built with **Quarkus (Java)** on the backend and **Vite + pnpm (JavaScript)** on the frontend.

---

## 📁 Project Structure

```plaintext
course-app/
├── src/    # Quarkus backend
└── frontend/   # Vite frontend project
```
---

## Backend Setup & Run

1. Open a terminal and navigate to root directory:

   ```bash
   mvn clean install quarkus:dev
   ```

Build and start Quarkus in dev mode:

Quarkus backend will start on:
http://localhost:8080

Your backend is configured to serve the frontend static files from the frontend folder via Quinoa.
2. Open a browser and navigate to:

   ```
   http://localhost:8080
   ```

   You should see the Quarkus welcome page.
3. To access the frontend, navigate to:

   ``` 
   http://localhost:8080/home
   ```

   This will serve the Vite frontend application.