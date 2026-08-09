import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    localStorage.setItem(
      "user",
      JSON.stringify({ email: credentials.email })
    );

    navigate("/");
  };

  return (
    
    <div className="min-h-screen bg-[#d9f0fb]  flex items-center justify-center px-4 py-12">
      <button className="bg-white ">back</button> 
      <div className="w-full max-w-md rounded-3xl h-[550px] bg-white/95 p-8 shadow-2xl backdrop-blur-xl border border-white/40 text-slate-900">
          <h1 className="text-3xl font-bold text-center pb-2">
            Login to Your Account
          </h1>
          <p className="mt-3 text-center text-slate-600">
            Enter your email and password to continue shopping.
          </p>

          <form onSubmit={handleSubmit} className="pt-8 space-y-6">
            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <label className="block pb-5">
              <span className="text-1xl font-semibold text-slate-600 ">
                Email Address
              </span>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="pt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block pb-10">
              <span className="text-1xl font-semibold text-slate-600">
                Password
              </span>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-sky-500"
                placeholder="Enter your password"
                required
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-sky-600 px-6 py-3 text-white text-lg font-semibold hover:bg-sky-700 "
            >
              Login
            </button>
          </form>

          <p className="pt-6 text-center text-sm text-slate-500">
            No account? You can still shop as a guest.
          </p>
        </div>
    </div>
  );
}

export default Login;
