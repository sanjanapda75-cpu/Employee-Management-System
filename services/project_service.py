from database.project_queries import (
    db_get_all_projects,
    db_get_one_project,
    db_create_project,
    db_update_project,
    db_delete_project
)

def service_get_all_projects():
    return db_get_all_projects()

def service_get_one_project(project_id):
    return db_get_one_project(project_id)

def service_create_project(data):
    return db_create_project(data)

def service_update_project(project_id, data):
    return db_update_project(project_id, data)

def service_delete_project(project_id):
    return db_delete_project(project_id)