from datetime import datetime
from .connection import get_connection

# --- EMPLOYEE QUERIES ---

def db_get_all():
    """Retrieves all employees from the database (Standard)."""
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

# --- JOIN QUERY (Added for Dashboard) ---

def get_all_employees_with_status():
    """
    Fetches all employees and joins with the payroll table 
    to get the real-time salary status from the Finance records.
    """
    conn = get_connection()
    
    # We use LEFT JOIN so employees without payroll records still show up.
    # We use COALESCE to show 'Not Processed' if no payroll record exists.
    query = """
    SELECT 
        e.id, 
        e.name, 
        e.email, 
        e.department, 
        e.address,
        COALESCE(p.salary_status, 'Not Processed') as status
    FROM 
        employee e
    LEFT JOIN 
        payroll p ON e.id = p.employee_id
    ORDER BY 
        e.id DESC
    """
    
    rows = conn.execute(query).fetchall()
    conn.close()
    
    # Convert rows to a list of dictionaries
    results = []
    for row in rows:
        results.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "department": row[3],
            "address": row[4],
            "status": row[5]
        })
        
    return results