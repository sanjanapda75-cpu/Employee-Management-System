from .connection import get_connection

def db_get_all_payroll():
    """Retrieves all payroll records from the database."""
    conn = get_connection()
    # Selects all columns from the payroll table [cite: 228]
    rows = conn.execute("SELECT * FROM payroll ORDER BY id DESC").fetchall()
    conn.close()
    # Converts each row into a dictionary for JSON output [cite: 229]
    return [dict(r) for r in rows]

def db_get_one_payroll(payroll_id):
    """Retrieves a single payroll record by its ID."""
    conn = get_connection()
    # Fetches a specific record where the ID matches [cite: 238]
    row = conn.execute("SELECT * FROM payroll WHERE id = ?", (payroll_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_payroll(data):
    """Stores a new payroll record and returns the created object."""
    conn = get_connection()
    # Inserts data into payroll table matching the form inputs [cite: 237]
    cur = conn.execute(
        "INSERT INTO payroll (employee_id, name, salary_status) VALUES (?, ?, ?)",
        (data["employee_id"], data["name"], data["salary_status"])
    )
    conn.commit()
    # Captures the auto-incremented ID of the new record [cite: 247]
    new_id = cur.lastrowid
    conn.close()
    # Returns the fresh record from the DB to ensure data integrity [cite: 252]
    return db_get_one_payroll(new_id)

def db_update_payroll(payroll_id, data):
    """Updates an existing payroll record and returns the updated object."""
    conn = get_connection()
    # Executes an update statement on the specific ID [cite: 270, 350]
    conn.execute(
        "UPDATE payroll SET employee_id=?, name=?, salary_status=? WHERE id=?",
        (data["employee_id"], data["name"], data["salary_status"], payroll_id)
    )
    conn.commit()
    conn.close()
    return db_get_one_payroll(payroll_id)

def db_delete_payroll(payroll_id):
    """Deletes a payroll record and returns the record that was removed."""
    # Fetch record first to return it after deletion [cite: 356]
    payroll = db_get_one_payroll(payroll_id)
    if not payroll:
        return None
    conn = get_connection()
    # Permanently removes the record from the database [cite: 360]
    conn.execute("DELETE FROM payroll WHERE id = ?", (payroll_id,))
    conn.commit()
    conn.close()
    return payroll