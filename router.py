from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers

# Employee Controllers
from controller.employee import (
    get_all_employee,
    get_employee,
    create_employee,
    update_employee,
    delete_employee,
)

# Payroll Controllers
from controller.payroll import (
    get_all_payroll,
    get_payroll,
    create_payroll,
    update_payroll,
    delete_payroll,
)

# Project Controllers
from controller.project import (
    get_all_projects,
    get_project,
    create_project,
    update_project,
    delete_project
)

# -------------------------------
# UI ROUTER (SPA shell + static)
# -------------------------------
FRONTEND_ROUTES = {
    "/", "/home", "/employee", "/all-employees", 
    "/payroll", "/invoice", "/projects", "/events"     
}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True
    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True
    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True
    if not path.startswith("/api"):
        serve_static(handler, "frontend/pages/index.html")
        return True
    return False

# -------------------------------
# MAIN ROUTER CLASS
# -------------------------------
class employeeRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    def do_GET(self):
        path = urlparse(self.path).path
        if handle_ui_routes(self, path):
            return

        # 1. Exact API matches (Check these FIRST)
        if path == "/api/employee":
            return get_all_employee(self)
        if path == "/api/payroll":
            return get_all_payroll(self)
        if path == "/api/projects":
            return get_all_projects(self)

        # 2. Dynamic ID routes (Check these LAST)
        if path.startswith("/api/payroll/"):
            try:
                payroll_id = int(path.split("/")[-1])
                return get_payroll(self, payroll_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/employee/"):
            try:
                employee_id = int(path.split("/")[-1])
                return get_employee(self, employee_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/projects/"):
            try:
                project_id = int(path.split("/")[-1])
                return get_project(self, project_id)
            except ValueError:
                return send_404(self)
        
        return send_404(self)
    
    def do_POST(self):
        path = urlparse(self.path).path

        if path == "/api/employee" or path == "/api/employee/":
            return create_employee(self)
        if path == "/api/payroll" or path == "/api/payroll/":
            return create_payroll(self)
        if path == "/api/projects" or path == "/api/projects/":
            return create_project(self)
            
        return send_404(self)

    def do_PUT(self):
        path = urlparse(self.path).path

        if path.startswith("/api/payroll/"):
            try:
                payroll_id = int(path.split("/")[-1])
                return update_payroll(self, payroll_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/employee/"):
            try:
                employee_id = int(path.split("/")[-1])
                return update_employee(self, employee_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/projects/"):
            try:
                project_id = int(path.split("/")[-1])
                return update_project(self, project_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    def do_DELETE(self):
        path = urlparse(self.path).path

        if path.startswith("/api/payroll/"):
            try:
                payroll_id = int(path.split("/")[-1])
                return delete_payroll(self, payroll_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/employee/"):
            try:
                employee_id = int(path.split("/")[-1])
                return delete_employee(self, employee_id)
            except ValueError:
                return send_404(self)

        if path.startswith("/api/projects/"):
            try:
                project_id = int(path.split("/")[-1])
                return delete_project(self, project_id)
            except ValueError:
                return send_404(self)

        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")