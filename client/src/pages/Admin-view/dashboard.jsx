
// import ProductImageUpload from "@/components/admin-view/image-upload";
// import { Button } from "@/components/ui/button";
// import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminDashboard() {
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   console.log(uploadedImageUrl, "uploadedImageUrl");

//   function handleUploadFeatureImage() {
//     dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     });
//   }

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   console.log(featureImageList, "featureImageList");

//   return (
//     <div>
//       <ProductImageUpload
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         setImageLoadingState={setImageLoadingState}
//         imageLoadingState={imageLoadingState}
//         isCustomStyling={true}
//         // isEditMode={currentEditedId !== null}
//       />
//       <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
//         Upload
//       </Button>
//       <div className="flex flex-col gap-4 mt-5">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((featureImgItem) => (
//               <div className="relative">
//                 <img
//                   src={featureImgItem.image}
//                   className="w-full h-[300px] object-cover rounded-t-lg"
//                 />
//               </div>
//             ))
//           : null}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
//-----------main-----------//
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const dummyPerformanceData = [
//   { name: "Jan", views: 120, sales: 45 },
//   { name: "Feb", views: 300, sales: 139 },
//   { name: "Mar", views: 500, sales: 380 },
//   { name: "Apr", views: 278, sales: 200 },
//   { name: "May", views: 189, sales: 250 },
// ];

// const categoryProductDistribution = [
//   { name: "Oversized", value: 300 },
//   { name: "Graphic Printed", value: 200 },
//   { name: "Solid Colors", value: 150 },
//   { name: "Polo T-Shirts", value: 100 },
//   { name: "Hooded", value: 50 },
//   { name: "Long Sleeves", value: 30 },
//   { name: "Sleeveless", value: 120 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

// function AdminDashboard() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Dispatch any needed actions on mount
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

//         {/* Stats Summary */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
//           <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow text-center">
//             <h4 className="text-xl font-semibold">Total Orders</h4>
//             <p className="text-2xl font-bold">750</p>
//           </div>
//           <div className="bg-green-100 text-green-800 p-6 rounded-lg shadow text-center">
//             <h4 className="text-xl font-semibold">Total Users</h4>
//             <p className="text-2xl font-bold">420</p>
//           </div>
//           <div className="bg-yellow-100 text-yellow-800 p-6 rounded-lg shadow text-center">
//             <h4 className="text-xl font-semibold">Total Revenue</h4>
//             <p className="text-2xl font-bold">₹47,800</p>
//           </div>
//           <div className="bg-purple-100 text-purple-800 p-6 rounded-lg shadow text-center">
//             <h4 className="text-xl font-semibold">Active Categories</h4>
//             <p className="text-2xl font-bold">8</p>
//           </div>
//         </div>

//         {/* Performance Bar Chart */}
//         <div className="mb-10">
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">Monthly Views & Sales</h3>
//           <div className="w-full h-96 bg-white rounded-lg shadow px-4 py-6">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={dummyPerformanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="views" fill="#8884d8" />
//                 <Bar dataKey="sales" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Product Category Distribution Pie Chart */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 text-gray-700">Product Distribution by Category</h3>
//           <div className="w-full h-96 bg-white rounded-lg shadow px-4 py-6 flex justify-center items-center">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryProductDistribution}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={120}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label={({ name }) => name}
//                 >
//                   {categoryProductDistribution.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;


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
