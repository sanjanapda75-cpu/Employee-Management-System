from .connection import get_connection

def get_all_payroll():
    """
    Fetches ALL employees and joins them with their payroll status.
    If no payroll record exists, it returns 'Not Started'.
    """
    conn = get_connection()
    cursor = conn.cursor()
    
    # We select from EMPLOYEE first (LEFT JOIN) so new employees show up immediately.
    # We grab the payroll ID (p.id) to allow deletion/editing later.
    query = """
    SELECT 
        p.id as payroll_id,
        e.id as employee_id,
        e.name,
        COALESCE(p.salary_status, 'Not Started') as status
    FROM 
        employee e
    LEFT JOIN 
        payroll p ON e.id = p.employee_id
    ORDER BY 
        e.id DESC
    """
    
    cursor.execute(query)
    rows = cursor.fetchall()
    
    results = []
    for row in rows:
        results.append({
            "payroll_id": row[0],  # Will be None if no record exists
            "employee_id": row[1],
            "name": row[2],
            "status": row[3]
        })
        
    conn.close()
    return results

def create_payroll_record(data):
    """
    Creates a new payroll entry linking an Employee ID to a Status.
    """
    conn = get_connection()
    
    # We strictly use employee_id to link. 
    # We do NOT need to insert 'name' separately because we fetch it via JOIN.
    conn.execute(
        "INSERT INTO payroll (employee_id, salary_status) VALUES (?, ?)",
        (data["employee_id"], data["salary_status"])
    )
    conn.commit()
    conn.close()
    return True

def delete_payroll_record(payroll_id):
    """
    Deletes a payroll entry by its unique Payroll ID.
    This effectively resets the employee's status to 'Not Started'.
    """
    conn = get_connection()
    conn.execute("DELETE FROM payroll WHERE id = ?", (payroll_id,))
    conn.commit()
    conn.close()
    return True