import React, { useState } from "react";
import "./UpdateEmployee.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEmployee = ({
  employee,
  id,
  handleCloseModal,
  getAllEmployees,
}) => {
  const [formData, setFormData] = useState({
    company: employee.company,
    last_name: employee.last_name,
    first_name: employee.first_name,
    job_title: employee.job_title,
    address: employee.address,
    city: employee.city,
    salary: employee.salary,
    img_link: employee.img_link,
  });

  const editEmployeeHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:4010/api/employees/update-employee/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        toast.success("Employee updated successfully");
        getAllEmployees();
      } else {
        toast.error("Failed to update employee");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred");
    }

    handleCloseModal();
  };

  return (
    <div>
      <form onSubmit={(e) => editEmployeeHandle(e)} className="update-form">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Job Title"
          value={formData.job_title}
          onChange={(e) =>
            setFormData({ ...formData, job_title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image Link"
          value={formData.img_link}
          onChange={(e) =>
            setFormData({ ...formData, img_link: e.target.value })
          }
        />
        <button type="submit">Submit Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
