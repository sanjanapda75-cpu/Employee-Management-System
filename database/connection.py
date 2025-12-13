import sqlite3
from datetime import datetime

DB_FILE = "employee.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS employee (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            address TEXT,
            department TEXT,
            salary(paid/not paid) TEXT
        )
    """)
    conn.commit()
    conn.close()
    print("✓ Database initialized")