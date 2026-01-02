from .connection import get_connection
from datetime import datetime

def db_get_all_projects():
    """Retrieves all projects from the database."""
    conn = get_connection()
    rows = conn.execute("SELECT * FROM projects ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one_project(project_id):
    """Retrieves a single project by ID."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM projects WHERE id=?", (project_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_project(data):
    """Creates a new project record."""
    conn = get_connection()
    cur = conn.execute(
        "INSERT INTO projects (name, client, status, description) VALUES (?, ?, ?, ?)",
        (data["name"], data["client"], data["status"], data["description"])
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_project(new_id)

def db_update_project(project_id, data):
    """Updates an existing project record."""
    conn = get_connection()
    conn.execute(
        "UPDATE projects SET name=?, client=?, status=?, description=? WHERE id=?",
        (data["name"], data["client"], data["status"], data["description"], project_id)
    )
    conn.commit()
    conn.close()
    return db_get_one_project(project_id)

def db_delete_project(project_id):
    """Deletes a project record."""
    project = db_get_one_project(project_id)
    if not project:
        return None
    conn = get_connection()
    conn.execute("DELETE FROM projects WHERE id=?", (project_id,))
    conn.commit()
    conn.close()
    return project