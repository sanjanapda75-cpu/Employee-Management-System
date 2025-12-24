# 📊 Employee Management System – README

A robust full-stack project built with **Python (vanilla backend)** and **Vanilla JavaScript + Tailwind CSS (frontend)**. This project implements a Single-Page Application (SPA) architecture to manage corporate employee records with dynamic data synchronization.

## 🚀 What This Project Demonstrates

### Full Stack Basics

* **REST APIs**: How a backend serves employee data over JSON endpoints.

* **Frontend-Backend Sync**: How the UI updates dynamically by fetching data from the server.

* **State Management**: Using a global store to maintain consistent data across different views like Manage and Payroll.


### Frontend Concepts

* **Single Page Application (SPA)**: Custom routing that injects HTML into the `#app` container without page reloads.

* **Modular JavaScript**: Using ES modules for components, controllers, and services.

* **Tailwind CSS**: Modern styling via CDN for a professional, responsive layout.

* **Dynamic Rendering**: Creating DOM elements on the fly to display employee tables and statistics.


### Backend Concepts

* **Raw Python Server**: Built using `BaseHTTPRequestHandler` without frameworks like Flask or FastAPI.

* **Manual Static Serving**: A custom module to handle MIME types and serve CSS/JS files.

* **SQLite Database**: A persistent, file-based database for all employee records.

* **CRUD Logic**: Backend handlers for Create, Read, Update, and Delete operations.



---

## 🏗️ Project Structure

EMPLOYEE-MANAGEMENT-SYSTEM/
├── controller/                 # Backend route controllers
│   ├── employee.py             # Logic for employee CRUD
│   ├── payroll.py              # Logic for payroll data
│   └── project.py              # Logic for project management
├── core/                       # Backend core functionality
│   ├── middleware.py           # CORS and request handling
│   ├── request.py              # JSON parsing utilities
│   ├── responses.py            # Standardized HTTP responses
│   └── static.py               # Static file server logic
├── database/                   # Data persistence layer
│   ├── connection.py           # SQLite3 connection & table init
│   └── queries.py              # SQL query definitions
├── frontend/                   # Frontend assets and UI
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css       # Global custom styles
│   │   └── js/
│   │       ├── components/     # UI reusable components (HTML/JS)
│   │       │   ├── Alert.js
│   │       │   ├── Employeeform.js
│   │       │   ├── Employeetable.js
│   │       │   ├── Footer.html
│   │       │   └── Header.html
│   │       ├── controllers/    # Client-side logic for views
│   │       │   ├── Employeecontroller.js
│   │       │   ├── PayrollController.js
│   │       │   └── ProjectController.js
│   │       ├── router/         # Client-side SPA routing
│   │       │   └── viewrouter.js
│   │       ├── services/       # API communication (Fetch)
│   │       │   └── Employeeservice.js
│   │       ├── state/          # Global state management
│   │       │   └── store.js
│   │       └── utils/          # JS helper functions
│   │           ├── dom.js
│   │           └── loadcomponent.js
│   ├── pages/                  # SPA View Templates
│   │   ├── 404.html
│   │   ├── employee.html       # Manage Employees view
│   │   ├── events.html         # Company events view
│   │   ├── home.html           # Landing page
│   │   ├── index.html          # Main SPA Entry point
│   │   ├── invoice.html        # Billing/Invoice view
│   │   ├── payroll.html        # Salary summary view
│   │   └── projects.html       # Internal projects view
│   └── env.js                  # Frontend environment variables
├── app.py                      # Main backend server entry point
├── employee.db                 # SQLite database file
├── router.py                   # Backend API route definitions
├── README.md                   # Project documentation
└── test_commands.sh            # Shell script for testing API endpoints

## 📊 Logic & Diagrams

### 1. Application Flowchart

* **Routing**: When a user clicks a link with `data-link`, the `viewrouter.js` intercepts the event, updates the URL via `history.pushState`, and fetches the requested HTML into the `#app` shell.

* **Data Fetching**: The `Employeecontroller` calls `apiGetAll`, which hits the `/api/employee` endpoint on the Python server.

* **State Sync**: Data is saved to `store.js`, which then triggers `renderEmployeetable` and `updatePayrollStats` to keep the UI synchronized across all pages.



### 2. Entity-Relationship (ER) Diagram

* **Employee Table**:
* `id` (INTEGER, PK): Unique identifier.
* `name`, `email`, `address`, `department` (TEXT): Employee details.
* `salary_status` (TEXT): Tracks payment status.
* `updated_at` (TEXT): Timestamp of last modification.


---

## 🎨 Dynamic Features

* **Synced Directory**: Employee records added or edited in the **Manage** page are instantly available in other views through the shared `loademployees` logic.
  
* **Live Payroll Calculation**: The Payroll page dynamically updates the **Total Staff** and **Monthly Payout** by multiplying the current employee count by a fixed average.

* **6-Month Event Timeline**: The Events page displays a pre-configured timeline of company activities to visualize future corporate scheduling.

* **Comprehensive Invoices**: Multiple billing templates (Invoices #099, #100, #101) are included to demonstrate billing layout and space management.


---

## 📦 Run the App

1. **Start Server**: `python app.py`.


2. **Visit**: `http://localhost:8000`.

