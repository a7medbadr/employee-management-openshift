import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL =
  "https://employee-api-a-badr-dev.apps.rm3.7wse.p1.openshiftapps.com";

function App() {

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    name: "",
    email: "",
    department: "",
    position: "",
    salary: "",
    joining_date: ""
  });

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);


  const loadEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      setEmployees(response.data);
    } catch (error) {
      toast.error("خطأ في تحميل البيانات", { theme: "colored" });
    }
  };


  useEffect(() => {
    loadEmployees();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // ⭐ إضافة موظف جديد
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/employees`, formData);

      toast.success("تم إضافة الموظف بنجاح", { theme: "colored" });

      setFormData({
        employee_id: "",
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        joining_date: ""
      });

      loadEmployees();

    } catch (error) {

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, { theme: "colored" });
      } else {
        toast.error("حدث خطأ أثناء الإضافة", { theme: "colored" });
      }

    }

  };


  // ⭐ تجهيز البيانات للتعديل
  const handleEdit = (employee) => {
    setEditMode(true);
    setEditId(employee.id);

    setFormData({
      employee_id: employee.employee_id,
      name: employee.name,
      email: employee.email,
      department: employee.department,
      position: employee.position,
      salary: employee.salary,
      joining_date: employee.joining_date
    });
  };


  // ⭐ تنفيذ التعديل
  const handleUpdate = async () => {

    try {
      await axios.put(`${API_URL}/employees/${editId}`, formData);

      toast.success("تم تعديل بيانات الموظف", { theme: "colored" });

      setEditMode(false);
      setEditId(null);

      setFormData({
        employee_id: "",
        name: "",
        email: "",
        department: "",
        position: "",
        salary: "",
        joining_date: ""
      });

      loadEmployees();

    } catch (error) {

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error, { theme: "colored" });
      } else {
        toast.error("حدث خطأ أثناء التعديل", { theme: "colored" });
      }

    }

  };


  // ⭐ حذف مع تأكيد
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("هل تريد حذف هذا الموظف؟");

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/employees/${id}`);
      toast.warning("تم حذف الموظف", { theme: "colored" });
      loadEmployees();
    } catch (error) {
      toast.error("حدث خطأ أثناء الحذف", { theme: "colored" });
    }
  };


  return (

    <div style={{padding:"30px"}}>

      <ToastContainer position="top-right" />

      <h1>Employee Management System</h1>

      <h2>{editMode ? "Update Employee" : "Add Employee"}</h2>

      <form onSubmit={editMode ? (e)=>{e.preventDefault(); handleUpdate();} : handleSubmit}>

        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <input
          type="date"
          name="joining_date"
          value={formData.joining_date}
          onChange={handleChange}
        />

        <button type="submit">
          {editMode ? "Update Employee" : "Add Employee"}
        </button>

      </form>

      <hr/>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {employees.map((employee)=>(

            <tr key={employee.id}>

              <td>{employee.id}</td>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.salary}</td>

              <td>

                <button
                  style={{
                    background:"blue",
                    color:"white",
                    marginRight:"10px",
                    cursor:"pointer"
                  }}
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>

                <button
                  style={{
                    background:"red",
                    color:"white",
                    cursor:"pointer"
                  }}
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default App;

