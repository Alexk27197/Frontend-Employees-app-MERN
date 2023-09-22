import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateEmployee.css";
import { BASE_URL } from "../../helper";
const CreateEmployee = ({ getAllEmployees }) => {
  const [formData, setFormData] = useState({
    company: "",
    last_name: "",
    first_name: "",
    job_title: "",
    address: "",
    city: "",
    salary: 0,
    img_link: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/employees/create-employee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("po neazzar", formData);
      if (res.ok) {
        toast.success("Employee created successfully");
        getAllEmployees();
        setFormData({
          company: "",
          last_name: "",
          first_name: "",
          job_title: "",
          address: "",
          city: "",
          salary: 0,
          img_link: "",
        });
      } else {
        toast.error("Failed to create employee");
      }
    } catch (error) {
      console.error("An error occurred", error);
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="update-form">
        <input
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={(e) =>
            setFormData({ ...formData, last_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="First Name"
          value={formData.first_name}
          onChange={(e) =>
            setFormData({ ...formData, first_name: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          value={formData.job_title}
          onChange={(e) =>
            setFormData({ ...formData, job_title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="City"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image Link"
          value={formData.img_link}
          onChange={(e) =>
            setFormData({ ...formData, img_link: e.target.value })
          }
          required
        />
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
