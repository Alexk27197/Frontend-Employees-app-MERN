import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./GetSingleEmployee.css";
import Layout from "../../components/Layout/Layout";
const GetSingleEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(
          `http://localhost:${4011 || 4010}/api/employees/get-employee/${id}`
        );
        const data = await res.json();
        setEmployee(data.employee);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div>Loading employee details...</div>;
  }

  return (
    <Layout>
      <div className="employee-details-container">
        <h2>Employee Details</h2>
        <div className="employee-details">
          <div className="persone-img ">
            <img src={employee.img_link} alt="" />
          </div>
          <div className="employee-field">
            <span className="field-label">First Name:</span>
            <span className="field-value">{employee.first_name}</span>
          </div>
          <div className="employee-field">
            <span className="field-label">Last Name:</span>
            <span className="field-value">{employee.last_name}</span>
          </div>
          <div className="employee-field">
            <span className="field-label">City:</span>
            <span className="field-value">{employee.city}</span>
          </div>
          <div className="employee-field">
            <span className="field-label">Company:</span>
            <span className="field-value">{employee.company}</span>
          </div>
          <div className="employee-field">
            <span className="field-label">Job Title:</span>
            <span className="field-value">{employee.job_title}</span>
          </div>
          <div className="employee-field">
            <span className="field-label">Salary:</span>
            <span className="field-value">{employee.salary}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GetSingleEmployee;
