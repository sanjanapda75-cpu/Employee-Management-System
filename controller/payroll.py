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
    """Retrieves all payroll records."""
    return send_json(handler, 200, service_get_all())

def get_payroll(handler, payroll_id):
    """Retrieves a single payroll record by ID."""
    payroll = service_get_one(payroll_id)
    return send_json(handler, 200, payroll) if payroll else send_404(handler)

def create_payroll(handler):
    """Creates a new payroll record from the request body."""
    data = parse_json_body(handler)
    new_payroll = service_create(data)
    return send_json(handler, 201, new_payroll)

def update_payroll(handler, payroll_id):
    """Updates an existing payroll record."""
    data = parse_json_body(handler)
    updated = service_update(payroll_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_payroll(handler, payroll_id):
    """Deletes a payroll record."""
    deleted = service_delete(payroll_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)