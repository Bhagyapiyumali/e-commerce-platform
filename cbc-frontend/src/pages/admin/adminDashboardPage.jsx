export default function AdminDashboardPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard Overview 👋
        </h1>
        <p className="text-gray-500">
          Welcome back, manage your cosmetics store easily
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-2xl font-bold text-green-600">$12,450</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold text-blue-600">320</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="text-2xl font-bold text-purple-600">85</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Customers</p>
          <h2 className="text-2xl font-bold text-orange-600">540</h2>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* Sales Chart Placeholder */}
        <div className="bg-white p-6 rounded-xl shadow h-72">
          <h3 className="font-semibold mb-4">📈 Sales Analytics</h3>
          <div className="text-gray-400">Chart will go here</div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-xl shadow h-72">
          <h3 className="font-semibold mb-4">🔥 Top Products</h3>

          <ul className="space-y-3 text-gray-700">
            <li>💄 Lipstick Matte Red - 120 sold</li>
            <li>🌸 Face Cream Glow - 98 sold</li>
            <li>🌿 Aloe Cleanser - 75 sold</li>
            <li>💋 Lip Balm - 60 sold</li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">🛒 Recent Orders</h3>

          <div className="space-y-3">
            <p>Order #1023 - Pending</p>
            <p>Order #1022 - Shipped</p>
            <p>Order #1021 - Delivered</p>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">🚨 Alerts</h3>

          <ul className="text-red-500 space-y-2">
            <li>Low stock: Face Serum</li>
            <li>5 pending orders</li>
            <li>1 failed payment</li>
          </ul>
        </div>

      </div>

    </div>
  );
}