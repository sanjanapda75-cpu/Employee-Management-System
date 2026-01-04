from database.payroll_queries import (
    db_get_all_payroll,
    db_get_one_payroll,
    db_create_payroll,
    db_update_payroll,
    db_delete_payroll
)

def service_get_all():
    return db_get_all_payroll()

def service_get_one(payroll_id):
    return db_get_one_payroll(payroll_id)

def service_create(data):
    return db_create_payroll(data)

def service_update(payroll_id, data):
    return db_update_payroll(payroll_id, data)

def service_delete(payroll_id):
    return db_delete_payroll(payroll_id)