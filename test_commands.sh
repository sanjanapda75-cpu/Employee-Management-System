# A. Get All employees
curl -X GET "https://glowing-guacamole-q7jvp4779w44cg7v-8000.app.github.dev/api/employee"

# B. Get One employee
curl -X GET "http://localhost:8000/api/employee/1"

# C. Create employee
curl -X POST "https://glowing-guacamole-q7jvp4779w44cg7v-8000.app.github.dev/api/employee" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sanjana",
    "email": "sanjana@example.com",
    "address": "odisha",
    "department": "sales",
    "salary_status": "paid"
  }'

# D. Update employee
curl -X PUT "https://glowing-guacamole-q7jvp4779w44cg7v-8000.app.github.dev/api/employee" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "sanjana Updated",
    "email": "sanjana_new@example.com",
    "address": "odisha",
    "department": "sales",
    "salary_status": "paid"
  }'

# E. Delete employee
curl -X DELETE "https://glowing-guacamole-q7jvp4779w44cg7v-8000.app.github.dev/api/employee"


##################### DB Observation Via SQLite Web
- install https://github.com/coleifer/sqlite-web
- pip install sqlite-web
- sqlite_web employees.db