# 📘 Employee Management System – README

A mini full-stack project built with **Python (backend)** and **Vanilla JavaScript + Tailwind (frontend)**. This project helps you understand how real web apps work by demonstrating routing, APIs, DOM manipulation, state management, and frontend-backend communication.

## 🚀 What This Project Demonstrates

### Full Stack Basics

* **REST APIs**: How a backend serves data over JSON endpoints.

* **Data Flow**: How a frontend fetches data and updates the UI dynamically.

* **Project Organization**: How to organize files in a modular, professional project.



### Frontend Concepts

* **Single Page Application (SPA)**: Dynamic routing without page reloads using a main shell.

* **Modular JavaScript**: Using ES modules to import logic and components.

* **State Management**: Maintaining a global application state to sync data across different views.

* **Component Structure**: Organized UI elements including Header, Footer, EmployeeForm, and EmployeeTable.



### Backend Concepts

* **Raw Python Server**: Built without frameworks to learn how HTTP actually works.

* **Manual Static Serving**: Logic for serving HTML, CSS, and JS files with correct MIME types.

* **SQLite Database**: Permanent file-based storage for records.



## 🏗️ Project Structure

```text
EMPLOYEE-MANAGEMENT-SYSTEM/
├── app.py                     # Starts the Python server 
├── router.py                  # Handles API + UI routes 
│
├── controller/                # API logic (CRUD operations)
│   └── employee.py            # Employee CRUD functions
├── services/                  # Business logic layer 
│   └── employee_service.py    # Bridge between controller and database 
├── database/                  # SQLite setup and functions 
│   ├── connection.py          # Database initialization
│   └── queries.py             # SQL query definitions 
│
├── core/                      # Server engine core modules 
│   ├── static.py              # Manual static file server
│   ├── middleware.py          # CORS header handling
│   ├── request.py             # JSON request parsing
│   └── responses.py           # JSON and 404 response helpers
│
├── frontend/
│   ├── pages/                 # SPA View templates 
│   │   ├── home.html          # Landing page 
│   │   ├── employee.html      # Manage Employee UI 
│   │   ├── payroll.html       # Salary summary 
│   │   └── index.html         # Main SPA shell 
│   ├── assets/
│   │   ├── css/style.css      # Custom styling
│   │   ├── js/
│   │   │   ├── router/        # SPA view router
│   │   │   ├── components/    # Reusable UI components 
│   │   │   ├── controllers/   # Frontend business logic 
│   │   │   ├── services/      # Fetch API calls 
│   │   │   ├── state/         # Global store 
│   │   │   └── utils/         # Helper functions
│   └── env.js                 # Environment config 
│
└── employee.db                # SQLite database file

```

## 🔌 How the App Works

1. **User visits /employee**: Backend serves `index.html` (the SPA shell). The `viewrouter.js` then loads the employee template into the main app container.

2. **JavaScript Controller Runs**: It initializes event listeners, fetches employee data via `apiGetAll()`, and renders it into the table.


3. **Manage Data**:
 * **Add**: Submitting the form sends a `POST` request to `/api/employee`.

* **Sync**: On success, the list reloads and updates the "All Employees" and "Payroll" views dynamically using global state.

4. **Edit / Delete**:
* **Edit**: Loads existing data into the form for modification.

* **Delete**: Triggers `DELETE /api/employee/:id` and refreshes the UI.


## 🗄️ Backend API

| Method | Path | Action |
| --- | --- | --- |
| **GET** | `/api/employee` | Retrieve all employees 

 |
| **GET** | `/api/employee/:id` | Retrieve one employee 

 |
| **POST** | `/api/employee` | Create a new employee 

 |
| **PUT** | `/api/employee/:id` | Update an employee 

 |
| **DELETE** | `/api/employee/:id` | Delete an employee 

 |

---

©2026 Full Stack Employee Management App built by Sanjana Panda.

