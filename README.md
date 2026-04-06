# SRM AP Lost & Found Portal

A full-stack web application for SRM University AP campus — lets students report lost and found items, browse all reports, and manage their own submissions.

## Tech Stack
- **Backend**: Java 17 + Spring Boot 3.2 + Spring Security (JWT) + H2 in-memory database
- **Frontend**: React 18 + React Router + Axios

## Project Structure
```
lost-and-found/
├── backend/          ← Spring Boot project
│   ├── pom.xml
│   └── src/main/java/com/srmap/lostandfound/
│       ├── config/       (SecurityConfig, DataSeeder)
│       ├── controller/   (AuthController, ItemController)
│       ├── dto/          (Request/Response objects)
│       ├── model/        (User, Item)
│       ├── repository/   (JPA repositories)
│       ├── security/     (JWT, Auth filter)
│       └── service/      (AuthService, ItemService)
└── frontend/         ← React project
    ├── package.json
    └── src/
        ├── components/   (Navbar, ItemCard, Modals)
        ├── context/      (AuthContext)
        ├── pages/        (Home, Login, Register, Dashboard)
        └── services/     (api.js - Axios calls)
```

## Prerequisites
- Java 17+  (check: `java -version`)
- Maven 3.6+ (check: `mvn -version`)
- Node.js 16+ (check: `node -version`)
- npm (check: `npm -version`)

## Running the App

### Step 1 — Start the Backend
```bash
cd backend
mvn spring-boot:run
```
Backend starts at: http://localhost:8080
H2 Console at:     http://localhost:8080/h2-console

### Step 2 — Start the Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```
Frontend starts at: http://localhost:3000

## Demo Accounts (auto-seeded)
| Email | Password |
|-------|----------|
| arjun.sharma@srmap.edu.in | password123 |
| priya.reddy@srmap.edu.in  | password123 |

## Key Features
- Public browsing and search (no login needed)
- Register/login restricted to @srmap.edu.in emails
- JWT-based authentication
- Report LOST or FOUND items with category, location, date, contact
- Personal dashboard to manage your reports
- Mark items as Resolved / Reopen / Delete
- H2 in-memory DB resets on restart (by design — switch to MySQL for persistence)

## H2 Console Access
URL: http://localhost:8080/h2-console
JDBC URL: jdbc:h2:mem:lostandfounddb
User: sa
Password: password

## API Endpoints
| Method | URL | Auth | Description |
|--------|-----|------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login |
| GET | /api/items | Public | Search/browse items |
| GET | /api/items/{id} | Public | Get single item |
| POST | /api/items | Required | Report new item |
| GET | /api/items/my | Required | Get my items |
| PUT | /api/items/{id} | Required | Edit my item |
| PATCH | /api/items/{id}/status | Required | Update status |
| DELETE | /api/items/{id} | Required | Delete my item |
