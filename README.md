# 📊 Employee Management System – README

A robust full-stack project built with **Python (vanilla backend)** and **Vanilla JavaScript + Tailwind CSS (frontend)**. This project implements a Single-Page Application (SPA) architecture to manage corporate employee records with dynamic data synchronization.

## 🚀 What This Project Demonstrates

### Full Stack Basics

* 
**REST APIs**: How a backend serves employee data over JSON endpoints.


* 
**Frontend-Backend Sync**: How the UI updates dynamically by fetching data from the server.


* 
**State Management**: Using a global store to maintain consistent data across different views like Manage and Payroll.



### Frontend Concepts

* 
**Single Page Application (SPA)**: Custom routing that injects HTML into the `#app` container without page reloads.


* 
**Modular JavaScript**: Using ES modules for components, controllers, and services.


* 
**Tailwind CSS**: Modern styling via CDN for a professional, responsive layout.


* 
**Dynamic Rendering**: Creating DOM elements on the fly to display employee tables and statistics.



### Backend Concepts

* 
**Raw Python Server**: Built using `BaseHTTPRequestHandler` without frameworks like Flask or FastAPI.


* 
**Manual Static Serving**: A custom module to handle MIME types and serve CSS/JS files.


* 
**SQLite Database**: A persistent, file-based database for all employee records.


* 
**CRUD Logic**: Backend handlers for Create, Read, Update, and Delete operations.



---

## 🏗️ Project Structure

```text
EMPLOYEE-MANAGEMENT-SYSTEM/
│
[cite_start]├── app.py                     # Starts the Python server [cite: 3088]
[cite_start]├── router.py                  # Handles API + UI route logic [cite: 3339]
[cite_start]├── employee.db                # SQLite database file [cite: 556]
│
[cite_start]├── controller/                # API Logic handlers [cite: 43]
[cite_start]│   └── employee.py            # CRUD functions [cite: 60]
│
[cite_start]├── services/                  # Business logic layer [cite: 107]
[cite_start]│   └── employee_service.py    # Database interaction [cite: 3054]
│
[cite_start]├── database/                  # SQLite configuration [cite: 68]
[cite_start]│   ├── connection.py          # Database setup and connection [cite: 582]
[cite_start]│   └── queries.py             # SQL query statements [cite: 594]
│
[cite_start]├── core/                      # Server engine components [cite: 64]
[cite_start]│   ├── static.py              # Manual static file server [cite: 205]
[cite_start]│   ├── middleware.py          # CORS and header management [cite: 202]
[cite_start]│   ├── request.py             # JSON body parsing [cite: 203]
[cite_start]│   └── responses.py           # JSON and 404 helpers [cite: 204]
│
[cite_start]└── frontend/                  # Frontend SPA [cite: 76]
    [cite_start]├── pages/                 # HTML templates (home, employee, invoice, etc.) [cite: 2298]
    [cite_start]├── env.js                 # Global configuration [cite: 38]
    └── assets/
        [cite_start]├── css/               # Tailwind and custom styles [cite: 81]
        └── js/
            [cite_start]├── router/        # SPA navigation logic [cite: 1101]
            [cite_start]├── components/    # Reusable UI elements [cite: 87]
            [cite_start]├── controllers/   # Frontend business logic [cite: 100]
            [cite_start]├── state/         # Global app state management [cite: 1105]
            [cite_start]└── utils/         # DOM helpers ($, createElement) [cite: 1110]

```

---

## 📊 Logic & Diagrams

### 1. Application Flowchart

* 
**Routing**: When a user clicks a link with `data-link`, the `viewrouter.js` intercepts the event, updates the URL via `history.pushState`, and fetches the requested HTML into the `#app` shell.


* 
**Data Fetching**: The `Employeecontroller` calls `apiGetAll`, which hits the `/api/employee` endpoint on the Python server.


* 
**State Sync**: Data is saved to `store.js`, which then triggers `renderEmployeetable` and `updatePayrollStats` to keep the UI synchronized across all pages.



### 2. Entity-Relationship (ER) Diagram

* **Employee Table**:
* 
`id` (INTEGER, PK): Unique identifier.


* 
`name`, `email`, `address`, `department` (TEXT): Employee details.


* 
`salary_status` (TEXT): Tracks payment status.


* 
`updated_at` (TEXT): Timestamp of last modification.





---

## 🎨 Dynamic Features

* 
**Synced Directory**: Employee records added or edited in the **Manage** page are instantly available in other views through the shared `loademployees` logic.


* 
**Live Payroll Calculation**: The Payroll page dynamically updates the **Total Staff** and **Monthly Payout** by multiplying the current employee count by a fixed average.


* 
**6-Month Event Timeline**: The Events page displays a pre-configured timeline of company activities to visualize future corporate scheduling.


* 
**Comprehensive Invoices**: Multiple billing templates (Invoices #099, #100, #101) are included to demonstrate billing layout and space management.



---

## 📦 Run the App

1. 
**Start Server**: `python app.py`.


2. 
**Visit**: `http://localhost:8000`.

