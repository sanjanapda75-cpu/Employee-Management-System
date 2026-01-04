from core.responses import send_json, send_404
from core.request import parse_json_body
from services.project_service import (
    service_get_all_projects,
    service_get_one_project,
    service_create_project,
    service_update_project,
    service_delete_project
)

def get_all_projects(handler):
    projects = service_get_all_projects()
    return send_json(handler, 200, projects)

def get_project(handler, project_id):
    project = service_get_one_project(project_id)
    if project:
        return send_json(handler, 200, project)
    else:
        return send_404(handler)

def create_project(handler):
    data = parse_json_body(handler)
    new_project = service_create_project(data)
    return send_json(handler, 201, new_project)

def update_project(handler, project_id):
    data = parse_json_body(handler)
    updated = service_update_project(project_id, data)
    if updated:
        return send_json(handler, 200, updated)
    else:
        return send_404(handler)

def delete_project(handler, project_id):
    deleted = service_delete_project(project_id)
    if deleted:
        return send_json(handler, 200, {"deleted": True, "project": deleted})
    else:
        return send_404(handler)