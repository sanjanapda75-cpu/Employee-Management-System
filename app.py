from http.server import HTTPServer
from router import employeeRouter
from database.connection import init_database
from router import handle_ui_routes
def run_server():
    init_database()
    server = HTTPServer(("", 8000), employeeRouter)
    print("🚀 Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()