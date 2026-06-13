// import { useState } from "react";
// import { Link } from "react-router-dom";

// function LoginForm() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       setError("Please fill all fields");
//       return;
//     }
//     setError("");
//     console.log(formData);
//   };

//   return (
//     <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50 grid md:grid-cols-2 border border-slate-800">

//       <div className="relative hidden md:flex flex-col justify-between bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 p-10 overflow-hidden">


//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white translate-x-16 -translate-y-16" />
//           <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white -translate-x-10 translate-y-10" />
//         </div>
//         <div className="relative">
//           <div className="flex items-center gap-2">
      
//             <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
//             </svg>
//             <span className="text-white text-2xl font-black tracking-tight">LogiFlow</span>
//           </div>
//           <p className="text-orange-100 text-sm mt-1 font-medium">Smart Logistics Platform</p>
//         </div>

//         <div className="relative space-y-5">
//           {[
//             { icon: "🚚", label: "Real-Time Tracking", desc: "Monitor every shipment live" },
//             { icon: "📦", label: "Smart Deliveries", desc: "AI-optimized dispatch" },
//             { icon: "🗺️", label: "Route Optimization", desc: "Cut fuel costs by 30%" },
//           ].map((f) => (
//             <div key={f.label} className="flex items-start gap-3">
//               <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
//                 {f.icon}
//               </div>
//               <div>
//                 <p className="text-white font-semibold text-sm">{f.label}</p>
//                 <p className="text-orange-100 text-xs">{f.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <p className="relative text-orange-100 text-xs leading-relaxed border-t border-white/20 pt-4">
//           "Moving Made Easy, Wherever Life Takes You."
//         </p>
//       </div>

      
//       <div className="bg-slate-900 p-8 md:p-12 flex flex-col justify-center">

        
//         <div className="md:hidden flex items-center gap-2 mb-8">
//           <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
//           </svg>
//           <span className="text-white text-xl font-black">LogiFlow</span>
//         </div>

//         <div className="mb-8">
//           <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
//           <p className="text-slate-400 text-sm mt-1">Sign in to manage your logistics dashboard</p>
//         </div>

//         {error && (
//           <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-5 text-sm">
//             <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//             </svg>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        
//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               name="email"
//               placeholder="Email or Username"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full bg-slate-800 text-white pl-11 pr-4 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm placeholder-slate-500"
//             />
//           </div>

          
//           <div className="relative group">
//             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full bg-slate-800 text-white pl-11 pr-11 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all text-sm placeholder-slate-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-orange-400 transition-colors"
//             >
//               {showPassword ? (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               ) : (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               )}
//             </button>
//           </div>

//           <div className="flex justify-end">
//             <a href="#" className="text-orange-500 text-xs hover:text-orange-400 transition-colors">Forgot password?</a>
//           </div>

//           <button
//             type="submit"
//             className="relative bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all py-3.5 rounded-xl text-white font-bold text-sm tracking-wide overflow-hidden group"
//           >
//             <span className="relative z-10">Sign In</span>
//             <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
//           </button>
//         </form>

//         <div className="flex items-center gap-3 my-5">
//           <div className="flex-1 h-px bg-slate-800" />
//           <span className="text-slate-600 text-xs">or</span>
//           <div className="flex-1 h-px bg-slate-800" />
//         </div>

//         <p className="text-slate-400 text-sm text-center">
//           New to RouteIQ?{" "}
//           <Link to="/register" className="text-orange-500 font-semibold hover:text-orange-400 transition-colors">
//             Create an account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;


//After Edit
// filepath: src/components/LoginForm.jsx
// filepath: src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) { setError("Please select a role first"); return; }
    if (!formData.email || !formData.password) { setError("Please fill all fields"); return; }
    setError("");
      if (selectedRole === "company") {

        const res = await fetch(
          "http://localhost:8000/api/companies/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.detail || "Login failed");
          return;
        }
        localStorage.setItem(
          "company",
          JSON.stringify(data)
        );

        if (data.is_setup_complete) {
          navigate("/company/dashboard");
        } else {
          navigate("/company/profile");
        }

        return;
      }
      const role = roles.find(
      (r) => r.id === selectedRole
      );
      if (role) {
        navigate(role.redirect);
      }
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
            Sign In As
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
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Sign In As</p>
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

        <div className="mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">
            {selectedRole
              ? `Signing in as ${roles.find(r => r.id === selectedRole)?.label}`
              : "Select your role and sign in"}
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl mb-5 text-sm">
            ⚠ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF5722] transition-colors text-sm">
              @
            </div>
            <input
              type="text"
              placeholder="Email or Username"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-800 text-white pl-10 pr-4 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FF5722] transition-colors text-sm">
              🔒
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-800 text-white pl-10 pr-16 py-3.5 rounded-xl outline-none border border-slate-700 focus:border-[#FF5722] focus:ring-1 focus:ring-[#FF5722]/20 transition-all text-sm placeholder-slate-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#FF5722] transition-colors text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-[#FF5722] text-xs hover:text-[#FF7043] transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="bg-[#FF5722] hover:bg-[#FF7043] active:scale-[0.98] transition-all py-3.5 rounded-xl text-white font-bold text-sm tracking-wide"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-slate-600 text-xs">or</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <p className="text-slate-400 text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-[#FF5722] font-semibold hover:text-[#FF7043] transition-colors">
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}