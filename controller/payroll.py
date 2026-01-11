import json
from core.responses import send_json, send_404
from core.request import parse_json_body

# Import the specific queries that handle the JOIN logic
from database.payroll_queries import (
    get_all_payroll, 
    create_payroll_record, 
    delete_payroll_record
)

def get_all_payroll(handler):
    """
    Retrieves the list of ALL employees with their payroll status.
    Uses the new LEFT JOIN query so new employees appear automatically.
    """
    # This fetches the joined data (Employee + Payroll)
    results = get_all_payroll()
    return send_json(handler, 200, results)

def get_payroll(handler, payroll_id):
    """
    Retrieves a single payroll record. 
    (Kept for compatibility, though the dashboard mostly uses get_all)
    """
    # You can implement specific get_one logic here if needed later
    return send_404(handler)

def create_payroll(handler):
    """
    Creates a new payroll status for an employee.
    """
    data = parse_json_body(handler)
    # We use the ID-based creation function
    success = create_payroll_record(data)
    if success:
        return send_json(handler, 201, {"message": "Payroll Status Updated"})
    return send_json(handler, 500, {"error": "Failed to update payroll"})

def update_payroll(handler, payroll_id):
    """
    Updates a payroll record.
    (Optional for this flow since we mostly Add/Delete status)
    """
    # Placeholder: standard update logic can go here if required
    return send_404(handler)

def delete_payroll(handler, payroll_id):
    """
    Deletes a payroll record (Resets status to 'Not Started').
    """
    success = delete_payroll_record(payroll_id)
    if success:
        return send_json(handler, 200, {"deleted": True})
    return send_404(handler)