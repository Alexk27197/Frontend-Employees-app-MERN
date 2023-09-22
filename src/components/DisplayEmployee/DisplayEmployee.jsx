import React, { useState, useEffect, useCallback } from "react";
import "./DisplayEmployee.css";
import { Modal } from "@material-ui/core";
import UpdateEmployee from "../UpdateEmployee/UpdateEmployee";
import CreateEmployee from "../CreateEmployee/CreateEmployee";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link } from "react-router-dom";
const DisplayEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [id, setId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const getAllEmployees = async () => {
    try {
      const res = await fetch(
        `http://localhost:${4011 || 4010}/api/employees/get-employees`
      );
      const data = await res.json();
      setEmployees(data.employees);
      setFilteredEmployees(data.employees);
      console.log(data.employees);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleCloseModal = () => {
    setIsOpenEditModal(false);
    setIsOpenCreateModal(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async (deleteId) => {
    try {
      const res = await fetch(
        `http://localhost:${
          4011 || 4010
        }/api/employees/delete-employee/${deleteId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Employee deleted successfully");
        getAllEmployees();
      } else {
        toast.error("Failed to delete employee");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred");
    }
  };

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setIsOpenEditModal(true);
    setId(employee._id);
  };

  const handleOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const handleSearchEmployee = useCallback(() => {
    if (searchValue === "") {
      setFilteredEmployees(employees);
    } else {
      const filteredEmployees = employees.filter((employee) =>
        employee.first_name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredEmployees(filteredEmployees);
    }
  }, [searchValue, employees]); // <-- Dependencies of the useCallback

  useEffect(() => {
    handleSearchEmployee();
  }, [searchValue, handleSearchEmployee]);

  return (
    <div>
      <div className="top-position-of-display">
        <button
          onClick={handleOpenCreateModal}
          className="create-new-employee-btn"
        >
          Create Employee
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search for employee"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearchEmployee} type="submit">
            Search
          </button>
        </div>
      </div>

      <div className="create-employee">
        <Modal
          open={isOpenCreateModal}
          onClose={handleCloseModal}
          className="modal-container"
        >
          <div className="modal">
            <div onClick={handleCloseModal} className="close-edit-modal">
              X
            </div>
            <h2 className="edit-title">Create Employee</h2>
            <CreateEmployee getAllEmployees={getAllEmployees} />
          </div>
        </Modal>
      </div>

      <div className="display-employees-container">
        <div className="card-container">
          {filteredEmployees.length ? (
            filteredEmployees.map((employee) => {
              return (
                <div key={employee._id} className="card">
                  <Link
                    to={`/employee-details/${employee._id}`}
                    key={employee._id}
                  >
                    <div className="wrraper">
                      <div className="persone-img">
                        <img src={employee.img_link} alt="" />
                      </div>

                      <div className="right-side">
                        <div className="personal-details">
                          <h2 className="title">Personal details</h2>
                          <div className="personal-content">
                            <h2>
                              <span>First name:</span> {employee.first_name}
                            </h2>
                            <h2>
                              <span>Last name:</span> {employee.last_name}
                            </h2>
                            <h2>
                              <span>City:</span> {employee.city}
                            </h2>
                          </div>
                        </div>
                        <div className="job-details">
                          <h2 className="title">Job details</h2>
                          <div className="job-content">
                            <h2>
                              <span>Company:</span> {employee.company}
                            </h2>
                            <h2>
                              <span>Job title:</span> {employee.job_title}
                            </h2>
                            <h2>
                              <span>Salary:</span> ${employee.salary}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="buttons">
                    <button
                      className="edit"
                      onClick={(e) => {
                        handleOpenEditModal(employee);
                        e.stopPropagation();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEmployee(employee._id);
                      }}
                      className="delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>No employees found</h1>
          )}
        </div>
      </div>

      <Modal
        open={isOpenEditModal}
        onClose={handleCloseModal}
        className="modal-container"
      >
        <div className="modal">
          <div onClick={handleCloseModal} className="close-edit-modal">
            X
          </div>
          <h2 className="edit-title">Edit Employee</h2>
          {selectedEmployee && (
            <UpdateEmployee
              employee={selectedEmployee}
              id={id}
              handleCloseModal={handleCloseModal}
              getAllEmployees={getAllEmployees}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DisplayEmployee;
