# 💼 Job Application Tracker

A full-stack web application that helps users track and manage their job applications in one place.

## 🚀 Features

- Add new job applications
- View all applications
- Update application details
- Delete applications
- Search applications by company, role, or status
- Track application status
- Dashboard with application statistics
- Responsive user interface

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST API

### Database
- MySQL

### Tools
- VS Code
- Git
- GitHub

## 🏗️ Project Architecture

React Frontend
↓
REST API
↓
Spring Boot Backend
↓
Spring Data JPA
↓
MySQL Database

## 🔗 REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/jobs` | Add a job application |
| GET | `/api/jobs` | Get all applications |
| GET | `/api/jobs/{id}` | Get application by ID |
| PUT | `/api/jobs/{id}` | Update an application |
| DELETE | `/api/jobs/{id}` | Delete an application |

## ⚙️ How to Run

### Backend

1. Install MySQL.
2. Create the database:

```sql
CREATE DATABASE job_tracker;