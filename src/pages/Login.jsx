import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  // Email aur Password values
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // Separate Errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Password show/hide
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Input change
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Input value update
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Jis field mein typing ho rahi hai uski error remove
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Form Submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    // Email validation
    if (!credentials.email.trim()) {
      newErrors.email = "Please enter your email.";
    }

    // Password validation
    if (!credentials.password.trim()) {
      newErrors.password = "Please enter your password.";
    }

    // Errors set
    setErrors(newErrors);

    // Agar error hai to login stop
    if (newErrors.email || newErrors.password) {
      return;
    }

    // User save in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: credentials.email,
      }),
    );
    window.dispatchEvent(new Event("authChanged"));

    // Home page par redirect
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-[#081b24] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Main Login Box */}
      <div
        className="
          relative w-full max-w-[1200px] min-h-[650px]
          overflow-hidden
          border border-cyan-400
          shadow-[0_0_25px_rgba(34,211,238,0.35)]
        "
      >
        {/* Left Background */}
        <div className="absolute inset-0 bg-[#0d1f29]" />

        {/* Right Gradient Background */}
        <div
          className="
            absolute inset-y-0 right-0 w-[82%]
            bg-gradient-to-r
            from-[#163944] via-[#147584] to-[#20b8c6]
            [clip-path:polygon(30%_0,100%_0,100%_100%,80%_100%)]
          "
        />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-[650px]">
          {/* LEFT LOGIN SECTION */}
          <div
            className="
              w-full lg:w-[52%]
              flex items-center justify-center
              px-6 pt-10 pb-10
              sm:px-12 sm:pt-12 sm:pb-12
              lg:px-20 lg:pt-14 lg:pb-14
            "
          >
            <div className="w-full max-w-[400px]">
              {/* Heading */}
              <h1 className="pb-10 pt-2 text-4xl font-bold text-white sm:text-5xl">
                Login
              </h1>

              <form onSubmit={handleSubmit}>
                {/* EMAIL FIELD */}
                <div className="pb-10">
                  <label className="mb-2 block text-lg text-slate-300">
                    Username
                  </label>

                  <div
                    className={`
                      flex items-center gap-3 border-b-2
                      transition duration-300
                      ${
                        errors.email
                          ? "border-red-500"
                          : "border-slate-400 focus-within:border-cyan-400"
                      }
                    `}
                  >
                    {/* User Icon - LEFT */}
                    <FaUser
                      className={`
                        shrink-0 text-lg
                        ${errors.email ? "text-red-400" : "text-slate-300"}
                      `}
                    />

                    <input
                      type="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="
                        w-full bg-transparent
                        py-3 text-lg text-white
                        outline-none
                        placeholder:text-slate-500
                      "
                    />
                  </div>

                  {/* Email Error */}
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* PASSWORD FIELD */}
                <div className="pb-8">
                  <label className="block text-lg text-cyan-300">
                    Password
                  </label>

                  <div
                    className={`
                      flex items-center gap-3 border-b-2
                      transition duration-300
                      ${
                        errors.password
                          ? "border-red-500"
                          : "border-cyan-400 focus-within:border-cyan-300"
                      }
                    `}
                  >
                    {/* Lock Icon - LEFT */}
                    <FaLock
                      className={`
                        shrink-0 text-lg
                        ${errors.password ? "text-red-400" : "text-cyan-400"}
                      `}
                    />

                    {/* Password Input */}
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="
                        w-full bg-transparent
                        py-3 text-lg text-white
                        outline-none
                        placeholder:text-slate-500
                      "
                    />

                    {/* Eye Icon - RIGHT */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="
                        shrink-0 text-lg text-cyan-400
                        hover:text-white
                        transition duration-300
                        cursor-pointer
                      "
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Error */}
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.password}
                    </p>
                  )}
                </div>
                {/* Forgot Password */}
                <div className="pb-10 text-right">
                  <Link
                    to="/forgot-password"
                    className="
                      text-1sm text-slate-300
                      hover:text-cyan-400
                      transition duration-300
                    "
                  >
                    Forgot Password?
                  </Link>
                </div>
                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="
                    mt-3 w-full rounded-full
                    border-2 border-cyan-300
                    bg-gradient-to-b
                    from-[#38d4e5] to-[#08717e]
                    py-3 text-xl font-bold text-white
                    shadow-[0_4px_12px_rgba(34,211,238,0.35)]
                    transition duration-300
                    hover:scale-[1.02]
                    hover:shadow-[0_5px_20px_rgba(34,211,238,0.55)]
                  "
                >
                  Login
                </button>

                {/* Sign Up */}
                <p className="pt-5 text-center text-base text-slate-300">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="
                      font-semibold text-cyan-400
                      transition duration-300
                      hover:text-cyan-300
                    "
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT WELCOME SECTION */}
          <div
            className="
              hidden lg:flex
              w-[48%]
              items-center justify-center
              px-12 pt-14 pb-14
            "
          >
            <div className="max-w-[340px] text-right">
              <h2 className="text-5xl font-bold leading-tight tracking-wide text-white">
                WELCOME
                <br />
                BACK!
              </h2>

              <p className="mt-5 text-xl leading-relaxed text-slate-100">
                Hope, You and your
                <br />
                Family have a Great
                <br />
                Day
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
