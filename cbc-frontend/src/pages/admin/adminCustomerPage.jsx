import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminCustomerPage() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
  axios
    .get(import.meta.env.VITE_BACKEND_URL + "/api/users")
    .then((res) => {
        const data = res.data;

        if (Array.isArray(data)) {
            setCustomers(data);
        } else {
            setCustomers([]); // or [data] if you want fallback
        }
    })
    .catch(() => toast.error("Failed to load customers"));
}, []);

  const filteredCustomers = customers.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          👥 Customers
        </h1>
        <p className="text-gray-500">
          Manage all registered users
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search customers by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>

            {filteredCustomers.map((customer, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">

                <td className="p-3 font-medium text-gray-800">
                  {customer.name}
                </td>

                <td className="p-3 text-gray-600">
                  {customer.email}
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded bg-blue-100 text-blue-600">
                    {customer.type || "user"}
                  </span>
                </td>

                <td className="p-3">
                  <span className="px-2 py-1 text-sm rounded bg-green-100 text-green-600">
                    Active
                  </span>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}