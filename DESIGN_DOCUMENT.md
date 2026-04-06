# Lost & Found Portal — Design Document

## 1. Project Overview

The Lost & Found Portal is a full-stack web application built for the SRM AP campus community. It allows students to:
- register with SRM AP email addresses,
- report lost and found items,
- browse available item reports,
- manage their own posted items,
- update item status to resolved or reopen,
- delete items they own.

The application consists of a Java Spring Boot backend and a React frontend.

## 2. System Architecture

### 2.1. Frontend

- Framework: React 18
- Routing: React Router DOM
- HTTP client: Axios
- Application structure:
  - `pages/` for page routes: Home, Login, Register, Dashboard, ReportItem
  - `components/` for reusable UI elements: Navbar, ItemCard, ItemDetailModal, ItemFormModal
  - `context/` for authentication state: `AuthContext`
  - `services/api.js` for API calls and token handling

The frontend is served on `http://localhost:3000` in development and proxies API requests to the backend.

### 2.2. Backend

- Framework: Spring Boot 3.2
- Language: Java 17
- Persistence: Spring Data JPA + H2 in-memory database
- Security: Spring Security with JWT authentication
- Validation: Spring Boot Starter Validation

The backend exposes a REST API under `/api/` and serves as the system authority for authentication, business rules, and data persistence.

## 3. Key Components

### 3.1. Backend Components

- `AuthController`
  - `POST /api/auth/register` — register a new user
  - `POST /api/auth/login` — user login and JWT issuance

- `ItemController`
  - `GET /api/items` — browse items
  - `GET /api/items/{id}` — get item details
  - `POST /api/items` — create a new item report
  - `GET /api/items/my` — list items owned by authenticated user
  - `PUT /api/items/{id}` — edit an item owned by the user
  - `PATCH /api/items/{id}/status` — update resolved/open status
  - `DELETE /api/items/{id}` — remove an owned item

- `AuthService`
  - registers users,
  - validates credentials,
  - generates JWT tokens.

- `ItemService`
  - handles item CRUD,
  - enforces ownership and status updates,
  - supports data retrieval for public and private lists.

- `JwtUtil`
  - creates and validates JWT tokens,
  - parses username and expiration from tokens.

- `JwtAuthFilter`
  - intercepts HTTP requests,
  - extracts the JWT token from headers,
  - authenticates requests against Spring Security context.

- `SecurityConfig`
  - configures public and protected routes,
  - enables stateless JWT security,
  - disables CSRF for API endpoints.

- `DataSeeder`
  - seeds demo user accounts and sample data on startup.

### 3.2. Data Models

- `User`
  - `id`, `name`, `email`, `password`
  - email registration restricted to SRM AP domain

- `Item`
  - `id`, `title`, `description`, `category`, `location`, `date`, `status`, `contactDetails`, `type` (lost/found)
  - relationship to `User` as owner

### 3.3. Frontend State and Flows

- `AuthContext` stores user identity and JWT token.
- Login/Register pages authenticate users and store the token.
- Dashboard page shows authenticated user items.
- Public home page allows browsing item reports.
- ReportItem page sends authenticated item reports to backend.

## 4. Data Flow

1. User submits login / registration form.
2. Frontend sends credentials to backend via `axios`.
3. Backend authenticates and returns a JWT.
4. Frontend stores token in local storage/context.
5. Authenticated API calls include `Authorization: Bearer <token>`.
6. Backend validates JWT and authorizes access.
7. Successful operations update item records in H2 database.

## 5. Security Design

- JWT-based stateless authentication.
- Password storage using secure hashing at backend (Spring Security mechanisms).
- Role: single authenticated user model — authorization is based on item ownership.
- Public endpoints: item browsing and account registration/login.
- Protected endpoints: create, update, delete, and user-specific item retrieval.
- Frontend enforces login for dashboard and reporting flows.

## 6. API Endpoints

| Method | Endpoint | Authentication | Purpose |
|--------|----------|----------------|---------|
| POST | `/api/auth/register` | No | Register new user |
| POST | `/api/auth/login` | No | Authenticate and issue JWT |
| GET | `/api/items` | No | Browse/search item listings |
| GET | `/api/items/{id}` | No | Retrieve item details |
| POST | `/api/items` | Yes | Create a lost/found report |
| GET | `/api/items/my` | Yes | Fetch current user’s reports |
| PUT | `/api/items/{id}` | Yes | Edit an owned item |
| PATCH | `/api/items/{id}/status` | Yes | Change item resolved/open status |
| DELETE | `/api/items/{id}` | Yes | Delete an owned item |

## 7. Deployment and Run Instructions

### Backend

- Requires Java 17 and Maven.
- Run from `backend/`:
  - `mvn spring-boot:run`
- Default backend port: `8080`
- H2 console available at `/h2-console`

### Frontend

- Requires Node.js and npm.
- Run from `frontend/`:
  - `npm install`
  - `npm start`
- Default frontend port: `3000`
- Proxy configured to backend at `http://localhost:8080`

## 8. Non-Functional Considerations

- Database: H2 in-memory for easy development and test resets.
- Scalability: can migrate to MySQL or PostgreSQL by changing Spring datasource config.
- Extensibility: clean separation of concerns between controller, service, repository, and frontend component layers.
- Usability: demo accounts seeded for quick evaluation.

## 9. Future Enhancements

- Replace H2 with a persistent SQL database.
- Add file/image upload for item photos.
- Add email notification on lost/found matches.
- Add advanced admin controls, search filters, and categories.
- Add pagination and sorting for item listings.

## 10. Summary

This design supports a modern single-page experience with secure backend APIs and a maintainable component model. The architecture isolates authentication, business logic, and persistence cleanly while supporting both public browsing and authenticated item management.
