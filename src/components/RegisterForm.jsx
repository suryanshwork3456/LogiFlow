// import { useState } from "react";
// import { Link } from "react-router-dom";

// function RegisterForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword || !formData.role) {
//       setError("Please fill all fields");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     setError("");
//     console.log(formData);
//   };

//   const inputBase =
//     "w-full bg-slate-800 text-white pl-11 pr-4 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm placeholder-slate-500";

//   return (
//     <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50 grid md:grid-cols-2 border border-slate-800">

//       <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 overflow-hidden border-r border-slate-700/50">

//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600" />

//         <div className="absolute bottom-10 right-0 w-52 h-52 rounded-full border border-orange-500/10 translate-x-20" />
//         <div className="absolute bottom-20 right-0 w-32 h-32 rounded-full border border-orange-500/10 translate-x-10" />

//         <div>
//           <div className="flex items-center gap-2 mb-2">
//             <svg className="w-7 h-7 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
//             </svg>
//             <span className="text-white text-2xl font-black tracking-tight">LogiFlow</span>
//           </div>
//           <p className="text-slate-400 text-sm">Smart Logistics Platform</p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <div className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Join as</div>
//             <div className="space-y-3">
//               <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${formData.role === "admin" ? "border-orange-500 bg-orange-500/10" : "border-slate-700 bg-slate-800/50"}`}>
//                 <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-semibold">Admin</p>
//                   <p className="text-slate-400 text-xs">Full dashboard access</p>
//                 </div>
//               </div>

//               <div className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${formData.role === "rider" ? "border-orange-500 bg-orange-500/10" : "border-slate-700 bg-slate-800/50"}`}>
//                 <div className="w-9 h-9 bg-orange-500/20 rounded-lg flex items-center justify-center text-orange-400">
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="text-white text-sm font-semibold">Rider</p>
//                   <p className="text-slate-400 text-xs">Delivery & route management</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <p className="text-slate-500 text-xs leading-relaxed">
//           Driven by Trust, Powered by Experience.
//         </p>
//       </div>

//       <div className="bg-slate-900 p-8 md:p-10 flex flex-col justify-center relative">
//         <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 md:hidden" />

//         <div className="md:hidden flex items-center gap-2 mb-6">
//           <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
//           </svg>
//           <span className="text-white text-xl font-black">LogiFlow</span>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
//           <p className="text-slate-400 text-sm mt-1">Join the RouteIQ logistics network</p>
//         </div>

//         {error && (
//           <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-sm">
//             <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-3">

//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//             </div>
//             <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className={inputBase} />
//           </div>

//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//               </svg>
//             </div>
//             <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} className={inputBase} />
//           </div>

//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} className={`${inputBase} pr-11`} />
//             <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {showPassword
//                   ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
//                 }
//               </svg>
//             </button>
//           </div>

//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//             </div>
//             <input type={showConfirm ? "text" : "password"} name="confirmPassword" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} className={`${inputBase} pr-11`} />
//             <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {showConfirm
//                   ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   : <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></>
//                 }
//               </svg>
//             </button>
//           </div>

//           <div>
//             <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">Select Role</p>
//             <div className="grid grid-cols-2 gap-2">
//               {["admin", "rider"].map((role) => (
//                 <button
//                   key={role}
//                   type="button"
//                   onClick={() => setFormData({ ...formData, role })}
//                   className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-semibold text-sm transition-all ${
//                     formData.role === role
//                       ? "border-orange-500 bg-orange-500/15 text-orange-400 shadow-lg shadow-orange-500/10"
//                       : "border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-300"
//                   }`}
//                 >
//                   {role === "admin" ? (
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4z" />
//                     </svg>
//                   )}
//                   {role.charAt(0).toUpperCase() + role.slice(1)}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="relative bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all py-3.5 rounded-xl text-white font-bold text-sm tracking-wide overflow-hidden group mt-1"
//           >
//             <span className="relative z-10">Create Account</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </button>
//         </form>

//         <p className="text-slate-400 text-sm text-center mt-5">
//           Already have an account?{" "}
//           <Link to="/login" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default RegisterForm;

// After Edit Code
// filepath: src/components/RegisterForm.jsx
// filepath: src/components/RegisterForm.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const roles = [
  {
    id: "admin",
    label: "Admin",
    subtitle: "Internal operations team",
    icon: "🛡️",
    color: "border-[#FF5722] bg-[#FF5722]/10",
    activeText: "text-[#FF5722]",
    redirect: "/admin/control-tower",
  },
  {
    id: "rider",
    label: "Rider",
    subtitle: "Delivery & route management",
    icon: "🚚",
    color: "border-[#FF9800] bg-[#FF9800]/10",
    activeText: "text-[#FF9800]",
    redirect: "/rider/dashboard",
  },
  {
    id: "company",
    label: "Company",
    subtitle: "Track shipments & manage orders",
    icon: "🏢",
    color: "border-[#4CAF50] bg-[#4CAF50]/10",
    activeText: "text-[#4CAF50]",
    redirect: "/company/profile",
  },
];

export default function RegisterForm() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", confirm: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) { setError("Please select a role"); return; }
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill all fields"); return;
    }
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match"); return;
    }
    setError("");
    const role = roles.find(r => r.id === selectedRole);
    navigate(role.redirect);
  };

  return (
    <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50 grid md:grid-cols-2 border border-slate-800">

      {/* Left Panel */}
      <div className="relative hidden md:flex flex-col justify-between bg-[#1A1A2E] p-10 overflow-hidden border-r border-slate-800">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF5722]/5 translate-x-16 -translate-y-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#FF5722]/5 -translate-x-10 translate-y-10 pointer-events-none" />

        {/* Logo */}
        <div>
          <div className="text-3xl font-black tracking-tighter text-white mb-1">
            Logi<span className="text-[#FF5722]">Flow</span>
          </div>
          <p className="text-white/40 text-sm font-medium">Smart Logistics Platform</p>
        </div>

        {/* Role selector */}
        <div className="relative space-y-2">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-widest mb-4">
            Register As
          </p>
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => { setSelectedRole(role.id); setError(""); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left
                ${selectedRole === role.id
                  ? `${role.color} ${role.activeText}`
                  : "border-white/10 text-white/50 hover:border-white/20 hover:text-white/70"
                }`}
            >
              <span className="text-xl">{role.icon}</span>
              <div>
                <div className="font-bold text-sm">{role.label}</div>
                <div className="text-xs opacity-70">{role.subtitle}</div>
              </div>
              {selectedRole === role.id && (
                <span className="ml-auto text-lg">✓</span>
              )}
            </button>
          ))}
        </div>

        <p className="relative text-white/20 text-xs border-t border-white/10 pt-4">
          Driven by Trust, Powered by Experience.
        </p>
      </div>

      {/* Right Panel */}
      <div className="bg-slate-900 p-8 md:p-12 flex flex-col justify-center">

        {/* Mobile logo */}
        <div className="md:hidden text-2xl font-black tracking-tighter text-white mb-6">
          Logi<span className="text-[#FF5722]">Flow</span>
        </div>

        {/* Mobile role selector */}
        <div className="md:hidden mb-6">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Register As</p>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => { setSelectedRole(role.id); setError(""); }}
                className={`flex flex-col items-center gap-1 px-2 py-3 rounded-xl border-2 transition-all text-center
                  ${selectedRole === role.id
                    ? `${role.color} ${role.activeText}`
                    : "border-slate-700 text-slate-400"
                  }`}
              >
                <span className="text-lg">{role.icon}</span>
                <span className="text-[10px] font-bold">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-slate-400 text-sm mt-1">
            {selectedRole
              ? `Registering as ${roles.find(r => r.id === selectedRole)?.label}`
              : "Select your role to get started"}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-4 text-sm">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="w-full bg-slate-800 text-white px-4 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
          />

          <input
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-slate-800 text-white px-4 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-800 text-white px-4 pr-16 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#FF5722] text-xs transition-colors">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirm}
              onChange={(e) => setFormData({ ...formData, confirm: e.target.value })}
              className="w-full bg-slate-800 text-white px-4 pr-16 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#FF5722] text-xs transition-colors">
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#FF5722] hover:bg-[#FF7043] active:scale-[0.98] transition-all py-3.5 rounded-xl text-white font-bold text-sm tracking-wide mt-2"
          >
            Create Account
          </button>
        </form>

        <p className="text-slate-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-[#FF5722] font-semibold hover:text-[#FF7043] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}