from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from config import DATABASE_URI

app = Flask(__name__)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# Employee Model
class Employee(db.Model):
    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.String(20), unique=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True)
    department = db.Column(db.String(50))
    position = db.Column(db.String(100))
    salary = db.Column(db.Numeric(10, 2))
    joining_date = db.Column(db.Date)


# Home Route
@app.route("/")
def home():
    return jsonify({
        "message": "Employee Management API Running"
    })

# health
@app.route("/health")
def health():
    return {
        "status": "UP"
    }

# Get All Employees
@app.route("/employees", methods=["GET"])
def get_employees():

    employees = Employee.query.all()

    result = []

    for emp in employees:
        result.append({
            "id": emp.id,
            "employee_id": emp.employee_id,
            "name": emp.name,
            "email": emp.email,
            "department": emp.department,
            "position": emp.position,
            "salary": float(emp.salary),
            "joining_date": str(emp.joining_date)
        })

    return jsonify(result)


# Get Employee By ID
@app.route("/employees/<int:id>", methods=["GET"])
def get_employee(id):

    employee = Employee.query.get(id)

    if not employee:
        return jsonify({
            "error": "Employee not found"
        }), 404

    return jsonify({
        "id": employee.id,
        "employee_id": employee.employee_id,
        "name": employee.name,
        "email": employee.email,
        "department": employee.department,
        "position": employee.position,
        "salary": float(employee.salary),
        "joining_date": str(employee.joining_date)
    })


# Add Employee
@app.route("/employees", methods=["POST"])
def add_employee():

    data = request.get_json()

    employee = Employee(
        employee_id=data["employee_id"],
        name=data["name"],
        email=data["email"],
        department=data["department"],
        position=data["position"],
        salary=data["salary"],
        joining_date=data["joining_date"]
    )

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created successfully"
    }), 201


# Update Employee
@app.route("/employees/<int:id>", methods=["PUT"])
def update_employee(id):

    employee = Employee.query.get(id)

    if not employee:
        return jsonify({
            "error": "Employee not found"
        }), 404

    data = request.get_json()

    employee.name = data["name"]
    employee.email = data["email"]
    employee.department = data["department"]
    employee.position = data["position"]
    employee.salary = data["salary"]

    db.session.commit()

    return jsonify({
        "message": "Employee updated successfully"
    })


# Delete Employee
@app.route("/employees/<int:id>", methods=["DELETE"])
def delete_employee(id):

    employee = Employee.query.get(id)

    if not employee:
        return jsonify({
            "error": "Employee not found"
        }), 404

    db.session.delete(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee deleted successfully"
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
