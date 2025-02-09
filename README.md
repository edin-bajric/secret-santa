# Secret Santa Application

This project is a web-based implementation of a Secret Santa application using **PostgreSQL**, **Spring Boot**, and **React**. Registered employees are randomly assigned a Secret Santa recipient. When employees log in, they can see who they are assigned to buy a gift for. The application supports two types of users: **Admin** and **Employee**.

---

## Features

### Admin Features
- **Generate Pairs**: Admins can generate random Secret Santa pairs.
- **View All Pairs**: Admins can view all generated pairs.
- **View Unassigned Employees**: Admins can view employees who do not have a Secret Santa recipient assigned.

### Employee Features
- **View Assigned Receiver**: Employees can log in to view their assigned Secret Santa recipient.
- **No Receiver Assigned**: If an employee does not have a receiver, they see a message indicating this.

---

## User Roles

### Admin
- Can generate pairs.
- Can view all pairs.
- Can view employees without pairs.

### Employee
- Can view their assigned receiver.
- Can see a message if no receiver is assigned.

---

## Workflow

### Admin Workflow
1. Log in.
2. Generate pairs.
3. View the list of pairs.
4. View employees without pairs.
5. Log out.

### Employee Workflow
1. Register (if not already registered).
2. Log in.
3. View their assigned receiver (or a message if no receiver is assigned).
4. Log out.

---

## System Architecture

The application consists of three main components:
1. **Frontend**: Built with **React**, **TypeScript**, and **Bootstrap**.
2. **Backend**: Built with **Spring Boot**, **Java**, and **PostgreSQL**.
3. **Database**: Uses **PostgreSQL** to store employee and pair data.

---

## Technologies

### Backend
- **Java**: Primary programming language.
- **Spring Boot**: Framework for building the backend.
- **PostgreSQL**: Relational database for storing data.
- **Flyway**: Database migration tool.
- **JPA**: Java Persistence API for ORM.
- **Hibernate**: ORM framework.
- **JWT**: JSON Web Tokens for authentication.
- **Lombok**: Library for reducing boilerplate code.
- **Maven**: Build automation tool.
- **OpenAPI**: API documentation.

### Frontend
- **Vite**: Build tool for the frontend.
- **TypeScript**: Primary programming language.
- **React**: JavaScript library for building the UI.
- **Bootstrap**: CSS framework for styling.
- **Axios**: HTTP client for making API requests.
- **React Router**: Routing library for React.
- **React Hook Form**: Library for form management.
- **React Query**: Library for data fetching and state management.
- **React Redux**: State management library.

---

## API Documentation

The backend exposes the following API endpoints:

### Admin Endpoints
- `POST /api/secret-santa/generate`: Generates Secret Santa pairs.
- `GET /api/secret-santa/pairs`: Retrieves all pairs.
- `GET /api/secret-santa/employees-without-pairs`: Retrieves employees without pairs.

### Employee Endpoints
- `GET /api/pairs/receiver`: Retrieves the receiver for the logged-in employee.

---

## Database Schema

The database consists of the following tables:

### `Employee`
- `id`: Primary key.
- `name`: Employee's first name.
- `surname`: Employee's last name.
- `username`: Employee's username (unique).
- `password`: Employee's password (hashed).
- `role`: Employee's role (Admin or Employee).

### `Pair`
- `id`: Primary key.
- `giver_id`: Foreign key referencing the `Employee` table (giver).
- `receiver_id`: Foreign key referencing the `Employee` table (receiver).

---

## Diagrams

All diagrams are included in the `diagrams` directory.

---

## How to Run the Project

### Backend
1. Clone the repository.
2. Set up a PostgreSQL database and update the `application.yml` file with your database credentials and jwt secret.
3. Run the Spring Boot application using Maven:
   ```bash
   mvn spring-boot:run
4. Access the API documentation at `http://localhost:8080/swagger-ui.html` (by default).
   
### Frontend
1. Navigate to the `secret-santa-ui` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Run the frontend application:
   ```bash
    npm run dev
    ```
4. Access the application at `http://localhost:5173` (by default).