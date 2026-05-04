import React, { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
    };

    setUsers([...users, newUser]);

    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Customer",
    });
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    setShowPopup(true);
  };

  const confirmDelete = () => {
    const updatedUsers = users.filter((_, i) => i !== deleteIndex);
    setUsers(updatedUsers);
    setShowPopup(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* Form */}
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          >
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add User
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white shadow p-6 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Users List</h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>

                  <td className="p-2 border">
                    <select
                      value={user.role}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].role = e.target.value;
                        setUsers(updatedUsers);
                      }}
                      className="border p-1 rounded"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteClick(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Popup */}
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
    <div className="bg-white p-6 rounded-xl text-center w-80 shadow-lg animate-scaleIn">
      <h3 className="text-lg font-semibold mb-4">
        Are you sure you want to delete?
      </h3>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowPopup(false)}
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>

        <button
          onClick={confirmDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default UserManagement;