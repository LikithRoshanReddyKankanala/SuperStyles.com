


// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     dispatch(loginUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }


//   return (
//   <div className="flex items-center justify-center min-h-screen bg-gray-100">
//     <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
//       <div className="text-center mb-6">
//         <h1 className="text-2xl font-semibold">Sign in to your account</h1>
//         <p className="mt-2 text-base">
//           Don't have an account?
//           <Link className="text-blue-500 ml-2 hover:underline" to="/auth/register">
//             Register
//           </Link>
//         </p>
//       </div>
//       <CommonForm
//         formControls={loginFormControls}
//         buttonText={"Sign In"}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={onSubmit}
//       />
//     </div>
//   </div>
// );

// }

// export default AuthLogin;

// <----------------------------------------------------->

// import starryNight from "@/assets/starry-night.jpg"; // Ensure correct path
// import logo from "@/assets/logo.Png"; // ✅ Add your actual logo path in assets
// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls } from "@/config";
// import { loginUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";

// const initialState = {
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [formData, setFormData] = useState(initialState);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function onSubmit(event) {
//     event.preventDefault();

//     dispatch(loginUser(formData)).then((data) => {
//       if (data?.payload?.success) {
//         toast({
//           title: data?.payload?.message,
//         });
//       } else {
//         toast({
//           title: data?.payload?.message,
//           variant: "destructive",
//         });
//       }
//     });
//   }

//   return (
//     <div
//       className="relative min-h-screen w-full flex items-center justify-center"
//       style={{
//         backgroundImage: `url(${starryNight})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* ✅ Top-right logo and brand name */}
//       <div className="absolute top-1 left-1 flex items-center space-x-2">
//         <img src={logo} alt="SuperStyles Logo" className="h-40 w-40 object-contain" />
//         <span className="text-white text-3xl font-bold drop-shadow-md">SuperStyles</span>
//       </div>

//       {/* ✅ Auth card */}
//       <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold">Sign in to your account</h1>
//           <p className="mt-2 text-base">
//             Don't have an account?
//             <Link className="text-blue-500 ml-2 hover:underline" to="/auth/register">
//               Register
//             </Link>
//           </p>
//         </div>
//         <CommonForm
//           formControls={loginFormControls}
//           buttonText={"Sign In"}
//           formData={formData}
//           setFormData={setFormData}
//           onSubmit={onSubmit}
//         />
//       </div>
//     </div>
//   );
// }

// export default AuthLogin;


// import starryNight from "@/assets/starry-night.jpg";
// import logo from "@/assets/logo.png";
// import CommonForm from "@/components/common/form";
// import { useToast } from "@/components/ui/use-toast";
// import { loginFormControls, registerFormControls } from "@/config";
// import { loginUser, registerUser } from "@/store/auth-slice";
// import { useState } from "react";
// import { useDispatch } from "react-redux";

// const loginInitial = {
//   email: "",
//   password: "",
// };

// const registerInitial = {
//   userName: "",
//   email: "",
//   password: "",
// };

// function AuthLogin() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [loginData, setLoginData] = useState(loginInitial);
//   const [registerData, setRegisterData] = useState(registerInitial);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleSubmit(event) {
//     event.preventDefault();

//     if (isLogin) {
//       dispatch(loginUser(loginData)).then((data) => {
//         if (data?.payload?.success) {
//           toast({ title: data?.payload?.message });
//         } else {
//           toast({ title: data?.payload?.message, variant: "destructive" });
//         }
//       });
//     } else {
//       dispatch(registerUser(registerData)).then((data) => {
//         if (data?.payload?.success) {
//           toast({ title: data?.payload?.message });
//           setIsLogin(true); // switch to login after success
//         } else {
//           toast({ title: data?.payload?.message, variant: "destructive" });
//         }
//       });
//     }
//   }

//   return (
//     <div
//       className="relative min-h-screen w-full flex items-center justify-center"
//       style={{
//         backgroundImage: `url(${starryNight})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Branding */}
//       <div className="absolute top-4 left-4 flex items-center space-x-3">
//         <img src={logo} alt="SuperStyles Logo" className="h-16 w-16 object-contain" />
//         <span className="text-white text-3xl font-bold drop-shadow-md font-comic">
//           SuperStyles
//         </span>
//       </div>

//       {/* Auth Card */}
//       <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
//         <div className="text-center mb-6">
//           <h1 className="text-2xl font-semibold">
//             {isLogin ? "Sign in to your account" : "Create a new account"}
//           </h1>
//           <p className="mt-2 text-base">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               className="auth-link ml-2 underline"
//               onClick={() => setIsLogin(!isLogin)}
//             >
//               {isLogin ? "Register" : "Login"}
//             </button>
//           </p>
//         </div>

//         <CommonForm
//           formControls={isLogin ? loginFormControls : registerFormControls}
//           buttonText={isLogin ? "Sign In" : "Sign Up"}
//           formData={isLogin ? loginData : registerData}
//           setFormData={isLogin ? setLoginData : setRegisterData}
//           onSubmit={handleSubmit}
//         />
//       </div>
//     </div>
//   );
// }

// export default AuthLogin;

// -----split screen------

import starryNight from "@/assets/starry-night.jpg";
import logo from "@/assets/logo.png";
import superheroGif from "@/assets/superhero2.gif";
import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls, registerFormControls } from "@/config";
import { loginUser, registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from "jwt-decode";
import { useDispatch } from "react-redux";

const loginInitial = {
  email: "",
  password: "",
};

const registerInitial = {
  userName: "",
  email: "",
  password: "",
};

function AuthLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState(loginInitial);
  const [registerData, setRegisterData] = useState(registerInitial);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();

    if (isLogin) {
      dispatch(loginUser(loginData)).then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
        } else {
          toast({ title: data?.payload?.message, variant: "destructive" });
        }
      });
    } else {
      dispatch(registerUser(registerData)).then((data) => {
        if (data?.payload?.success) {
          toast({ title: data?.payload?.message });
          setIsLogin(true);
        } else {
          toast({ title: data?.payload?.message, variant: "destructive" });
        }
      });
    }
  }

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      // You can dispatch this to your backend or save locally
      toast({
        title: `Welcome ${decoded.name || "user"}!`,
        description: "Logged in with Google",
      });

      // Optional: Dispatch a login action or store token
      // dispatch(loginWithGoogle(decoded));
    } catch (error) {
      toast({ title: "Google login failed", variant: "destructive" });
    }
  };

  const handleGoogleError = () => {
    toast({
      title: "Google Sign-In was unsuccessful",
      variant: "destructive",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Marvel Comic Side */}
      <div className="w-1/2 bg-black text-white flex flex-col top-1 left-1 items-start p-6 space-x-2">
        <img src={logo} alt="SuperStyles Logo" className="h-20 w-20 mb-2" />
        <span className="text-3xl font-comic text-yellow-300 drop-shadow-md">
          SuperStyles
        </span>
        <p className="text-xl text-center font-bold text-white drop-shadow">
          Style like a superhero 💥
        </p>
        <img
          src={superheroGif}
          alt="Animated Superhero"
          className="mt-20 w-full h-full object-contain animate-pulse"
        />
      </div>

      {/* Right Auth Side */}
      <div
        className="w-1/2 flex justify-center items-center"
        style={{
          backgroundImage: `url(${starryNight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md p-6 bg-slate-50 rounded shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold">
              {isLogin ? "Sign in to your account" : "Create a new account"}
            </h1>
            <p className="mt-2 text-base">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="auth-link ml-2 underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>

          <CommonForm
            formControls={isLogin ? loginFormControls : registerFormControls}
            buttonText={isLogin ? "Sign In" : "Sign Up"}
            formData={isLogin ? loginData : registerData}
            setFormData={isLogin ? setLoginData : setRegisterData}
            onSubmit={handleSubmit}
          />

          <div className="mt-6 text-center">
            <p className="mb-2 text-sm text-gray-600">Or sign in with</p>
           <GoogleLogin
  onSuccess={(credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);
  }}
  onError={() => {
    console.log("Login Failed");
  }}
/>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;

