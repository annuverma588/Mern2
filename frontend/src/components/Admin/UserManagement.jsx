import { useEffect, useState } from "react";
import { userApi } from "../../services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const loadUsers = async () => {
    try {
      const data = await userApi.list();
      setUsers(data.users || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const data = await userApi.create(formData);
      setUsers((current) => [data.user, ...current]);
      setFormData({ name: "", email: "", password: "", role: "user" });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRoleChange = async (user, role) => {
    try {
      const data = await userApi.update(user.id, { role });
      setUsers((current) =>
        current.map((item) => (item.id === user.id ? data.user : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.name}?`)) return;

    try {
      await userApi.remove(user.id);
      setUsers((current) => current.filter((item) => item.id !== user.id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="mb-4 text-2xl font-bold">User Management</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-bold">Add New User</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="mb-3 w-full rounded border p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="mb-3 w-full rounded border p-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="mb-3 w-full rounded border p-2"
            required
            minLength={6}
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mb-3 w-full rounded border p-2"
          >
            <option value="user">Customer</option>
            <option value="admin">Admin</option>
          </select>
          <button className="rounded bg-green-600 px-4 py-2 text-white">
            Add User
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="mb-4 text-lg font-bold">Users List</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <select
                    value={user.role}
                    onChange={(event) => handleRoleChange(user, event.target.value)}
                    className="rounded border p-1"
                  >
                    <option value="user">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="border p-2">
                  <button
                    type="button"
                    onClick={() => handleDelete(user)}
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
