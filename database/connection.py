import sqlite3
from datetime import datetime

DB_FILE = "employee.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    
    # 1. Employee Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employee (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL, 
            email TEXT NOT NULL, 
            address TEXT, 
            department TEXT, 
            salary_status TEXT, 
            updated_at TEXT
        );
    """)
    
    # 2. Payroll Table (UPDATED)
    # - Removed 'name' column (We fetch this via JOIN now)
    # - Changed employee_id to INTEGER for better linking
    # - Added FOREIGN KEY constraint
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payroll (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id INTEGER NOT NULL,
            salary_status TEXT NOT NULL,
            FOREIGN KEY (employee_id) REFERENCES employee (id) ON DELETE CASCADE
        );
    """)
    
    # 3. Projects Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            client TEXT NOT NULL,
            status TEXT NOT NULL,
            description TEXT
        );
    """)
    
    conn.commit()
    conn.close()
    print("✓ Database initialized")