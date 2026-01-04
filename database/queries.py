from datetime import datetime
from .connection import get_connection

# --- EMPLOYEE QUERIES ---

def db_get_all():
    """Retrieves all employees from the database."""
    conn = get_connection()
    rows = conn.execute("SELECT * FROM employee ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(employee_id):
    """Retrieves a single employee by ID."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM employee WHERE id = ?", (employee_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    """Creates a new employee record."""
    conn = get_connection()
    cur = conn.execute(
        "INSERT INTO employee (name, email, address, department, salary_status) VALUES (?, ?, ?, ?, ?)",
        (data["name"], data["email"], data["address"], data["department"], data["salary_status"])
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(employee_id, data):
    """Updates an existing employee record."""
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute(
        "UPDATE employee SET name=?, email=?, address=?, department=?, salary_status=?, updated_at=? WHERE id=?",
        (data["name"], data["email"], data["address"], data["department"], data["salary_status"], now, employee_id)
    )
    conn.commit()
    conn.close()
    return db_get_one(employee_id)

def db_delete(employee_id):
    """Deletes an employee record."""
    employee = db_get_one(employee_id)
    if not employee:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM employee WHERE id = ?", (employee_id,))
    conn.commit()
    conn.close()
    return employee