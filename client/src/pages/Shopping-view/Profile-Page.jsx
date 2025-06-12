import superheroAvatars from "@/data/superheroAvatars";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/auth-slice";
import { useState } from "react";

function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar || "");

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    dispatch(updateUserProfile({ ...user, avatar: avatarId }));
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <div className="mb-8">
        <p className="text-xl font-semibold mb-2">Choose your Avatar</p>
        <div className="grid grid-cols-11 md:grid-cols-8 gap-4">
          {superheroAvatars.map((avatar) => (
            <div
              key={avatar.id}
              onClick={() => handleAvatarSelect(avatar.id)}
              className={`cursor-pointer p-1 hover:shadow-md transition ${
                selectedAvatar === avatar.id ? "border-blue-500" : "border-gray-300"
              } flex flex-col items-center`}
            >
            <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
              <img
                src={avatar.img}
                alt={avatar.name}
                className="w-full h-full object-cover "
              />
              </div>
              <p className="text-center mt-2 font-medium">{avatar.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xl font-semibold">Name: {user.userName}</p>
        <p className="text-md text-gray-600">Email: {user.email}</p>
          
      </div>
    </div>
  );
}

export default ProfilePage;



// import { useState } from "react";

// const ProfilePage = () => {
//   const [profile, setProfile] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     CountryCode: "",
//     mobile: "",
//     gender: "",
//     DOB:"",
//     address: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can send this to backend or update state
//     console.log("Updated Profile:", profile);
//     alert("Profile updated!");
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white border rounded-2xl mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 text-sm font-medium">First Name</label>
//             <input
//               type="text"
//               name="firstName"
//               value={profile.firstName}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 text-sm font-medium">Last Name</label>
//             <input
//               type="text"
//               name="lastName"
//               value={profile.lastName}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Email ID</label>
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Mobile Number <span classname="text-red-500"></span></label>
//           <div classname="flex space-x-2">
//             <select
//               name="CountryCode"
//               value={profile.CountryCode}
//               onChange={handleChange}
//               classname="w-1/4 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             >
//                 <option value="+91">+91 (IN)</option>
//                 <option value="+1">+1 (US)</option>
//                 <option value="+44">+44 (UK)</option>
//                 <option value="+61">+61 (AU)</option> 
//             </select>
          
//           <input
//             type="tel"
//             name="mobile"
//             value={profile.mobile}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           />
//           </div>
//         </div>

//          <div>
//           <label className="block mb-1 text-sm font-medium">Gender</label>
//           <div className="flex gap-6">
//             <label className="flex items-center space-x-2">
//                 <input
//                     type="radio"
//                     name="Gender"
//                     value="Male"
//                     checked={profile.Gender==="Male"}
//                     onChange={handleChange}
//                     className="accent-blue-500"
//                 />
//                 <span>Male</span>
//             </label>
//              <label className="flex items-center space-x-2">
//                 <input
//                     type="radio"
//                     name="Gender"
//                     value="Female"
//                     checked={profile.Gender === "Female"}
//                     onChange={handleChange}
//                     className="accent-blue-500"
//                 />
//                 <span>Female</span>
//             </label>
//              <label className="flex items-center space-x-2">
//                 <input
//                     type="radio"
//                     name="Gender"
//                     value="other"
//                     checked={profile.Gender === "other"}
//                     onChange={handleChange}
//                     className="accent-blue-500"
//                 />
//                 <span>other</span>
//             </label>
//           </div>
//         </div>

//         <div>
//             <label className="block mb-1 text-sm font-medium">Date of Birth</label>
//             <input
//              type="date"
//              name="dob"
//              value={profile.dob}
//              onChange={handleChange}
//              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//              required
//             />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm font-medium">Default Address</label>
//           <textarea
//             name="address"
//             value={profile.address}
//             onChange={handleChange}
//             rows="3"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             required
//           ></textarea>
//         </div>

//         <div className="flex  justify-center">
//         <button
//           type="submit"
//           className="w-1/2 items-center py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
//         >
//           Save 
//         </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ProfilePage;
