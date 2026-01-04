import sqlite3
from datetime import datetime

DB_FILE = "employee.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    
    # Employee Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employee (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            email TEXT, 
            address TEXT, 
            department TEXT, 
            salary_status TEXT, 
            updated_at TEXT
        );
    """)
    
    # Payroll Table
    conn.execute("""
        CREATE TABLE IF NOT EXISTS payroll (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            employee_id TEXT NOT NULL,
            name TEXT NOT NULL,
            salary_status TEXT NOT NULL
        )
    """)
    
    # Projects Table (FIXED - changed 'title' to 'name', added 'description')
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