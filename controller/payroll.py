import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.payroll_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete
)

def get_all_payroll(handler):
    """Retrieves all payroll records[cite: 49, 84]."""
    return send_json(handler, 200, service_get_all())

def get_payroll(handler, payroll_id):
    """Retrieves a single payroll record by ID[cite: 85, 87]."""
    payroll = service_get_one(payroll_id)
    return send_json(handler, 200, payroll) if payroll else send_404(handler)

def create_payroll(handler):
    """Creates a new payroll record from the request body[cite: 88, 91]."""
    data = parse_json_body(handler)
    new_payroll = service_create(data)
    return send_json(handler, 201, new_payroll)

def update_payroll(handler, payroll_id):
    """Updates an existing payroll record[cite: 92, 95]."""
    data = parse_json_body(handler)
    updated = service_update(payroll_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_payroll(handler, payroll_id):
    """Deletes a payroll record[cite: 81, 99]."""
    deleted = service_delete(payroll_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)