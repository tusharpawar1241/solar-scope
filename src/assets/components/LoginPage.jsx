import React from "react";

function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b3940] via-[#041d22] to-black">

      {/* Background Glow */}
      <div className="absolute h-[400px] w-[900px] rounded-full bg-cyan-400/20 blur-[120px] animate-pulse"></div>

      {/* Login Card */}
      <div className="relative z-10 h-[540px] w-[380px] rounded-[35px] border border-white/30 bg-white/10 p-10 text-white shadow-2xl backdrop-blur-xl">

        {/* Logo */}
        <h1 className="mb-3 text-center text-5xl font-bold tracking-[8px] drop-shadow-lg">
          SPACE
        </h1>

        {/* Heading */}
        <h2 className="mb-5 text-center text-4xl font-light">
          Welcome Back
        </h2>

        {/* Form */}
        <form className="space-y-6">

          {/* Email */}
          <div>
            <label className="mb-2 block text-base">
              Email address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full rounded-2xl border border-white/40 bg-white/5 px-5 py-3 text-white placeholder-gray-300 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-base">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••••"
              className="w-full rounded-2xl border border-white/40 bg-white/5 px-5 py-3 text-white placeholder-gray-300 outline-none transition duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-sm text-gray-200 hover:text-cyan-300 cursor-pointer">
            Forgot Password?
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-500 py-3 text-2xl font-bold transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.7)]"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-5 text-center text-gray-200">
          Are You New Member?
          <span className="ml-2 cursor-pointer font-semibold text-cyan-300 hover:text-cyan-200">
            Sign Up
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;