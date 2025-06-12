// import { Outlet } from "react-router-dom";

// function AuthLayout() {
//     return(
//         <div className="flex min-h-screen w-full">
//             <div className="hidden lg:flex item-center justify-center bg-black  w-1/2 px-12">
//                 <div className="max-w-md space-y-6 text-center text-primary-foreground">
//                     <h1 className="text-4xl font-extrabold tracking-tight">
//                         Welcome to E-commerce shopping
//                     </h1>
//                 </div>
//                 <div className="flex flex-1 items-center w-1/2 justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
//                     <Outlet />
//                 </div>
//             </div>
//         </div>
//     );
    
// }

// export default AuthLayout;

import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="auth-layout">
      {/* Left Comic Superhero Panel */}
      <div className="auth-left">
        <div className="max-w-md space-y-3 text-center">
          <h1 className="auth-heading">Welcome to SuperStyles Shopping</h1>
        </div>
      </div>

      {/* Right Side - Form Outlet */}
      <div className="auth-right">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
