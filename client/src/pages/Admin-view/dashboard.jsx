
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";

const dummyPerformanceData = [
  { name: "Jan", views: 400, sales: 240 },
  { name: "Feb", views: 300, sales: 139 },
  { name: "Mar", views: 500, sales: 380 },
  { name: "Apr", views: 278, sales: 200 },
  { name: "May", views: 189, sales: 250 },
];

const categoryProductDistribution = [
  { name: "Oversized", value: 300 },
  { name: "Graphic Printed", value: 200 },
  { name: "Solid Colors", value: 150 },
  { name: "Polo T-Shirts", value: 100 },
  { name: "Hooded", value: 50 },
  { name: "Long Sleeves", value: 30 },
  { name: "Sleeveless", value: 120 },
];

const topSellingProducts = [
  { name: "Black Oversized Tee", sales: 1200 },
  { name: "Anime Hoodie", sales: 950 },
  { name: "Graphic Tee Red", sales: 780 },
  { name: "Marvel Shirt", sales: 600 },
  { name: "Solid Polo", sales: 450 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

function AdminDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch any needed actions on mount
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold">Total Orders</h4>
            <p className="text-2xl font-bold">1,250</p>
          </div>
          <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold">Total Users</h4>
            <p className="text-2xl font-bold">3,420</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold">Total Revenue</h4>
            <p className="text-2xl font-bold">₹5,47,800</p>
          </div>
          <div className="bg-purple-100 text-purple-800 p-6 rounded-lg shadow text-center">
            <h4 className="text-xl font-semibold">Active Categories</h4>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>

        {/* Performance Bar Chart */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Views & Sales</h3>
          <div className="w-full h-80 bg-white rounded-lg shadow px-4 py-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dummyPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Line Chart */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Sales Summary Over Time</h3>
          <div className="w-full h-80 bg-white rounded-lg shadow px-4 py-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dummyPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart and Top Products Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-lg shadow px-4 py-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Distribution by Category</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryProductDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {categoryProductDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow px-4 py-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Top Selling Products</h3>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingProducts} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
