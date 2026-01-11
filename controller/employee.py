import json
from core.responses import send_json, send_404
from core.request import parse_json_body

# Import standard CRUD services
from services.employee_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)

# Import the specific JOIN query for the dashboard
# This allows us to see Payroll Status inside the Employee Table
from database.queries import get_all_employees_with_status

def get_all_employee(handler):
    """
    Returns the list of employees. 
    Uses the JOIN query so the frontend receives 'salary_status' from the payroll table.
    """
    # We use the direct DB query here to ensure the JOIN happens
    employees = get_all_employees_with_status()
    return send_json(handler, 200, employees)

def get_employee(handler, employee_id):
    employee = service_get_one(employee_id)
    return send_json(handler, 200, employee) if employee else send_404(handler)

def create_employee(handler):
    data = parse_json_body(handler)
    new_employee = service_create(data)
    return send_json(handler, 201, new_employee)

def update_employee(handler, employee_id):
    data = parse_json_body(handler)
    updated = service_update(employee_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_employee(handler, employee_id):
    deleted = service_delete(employee_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)