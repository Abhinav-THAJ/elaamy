"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, User, Mail, Lock, Phone, ArrowRight, CheckCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: ""
  });

  const updateField = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate login — in production this would call WooCommerce auth or NextAuth
    await new Promise(r => setTimeout(r, 800));
    // For demo: store user info in localStorage
    localStorage.setItem("elaamy_user", JSON.stringify({ email: form.email, name: "Guest" }));
    setLoading(false);
    router.push("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    setError("");
    // Simulate registration
    await new Promise(r => setTimeout(r, 1000));
    localStorage.setItem("elaamy_user", JSON.stringify({ email: form.email, name: `${form.firstName} ${form.lastName}` }));
    setLoading(false);
    setSuccess("Account created successfully! Redirecting...");
    setTimeout(() => router.push("/"), 1500);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSuccess("Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png" alt="Elaamy" className="h-12 object-contain mx-auto mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Welcome Back" : mode === "register" ? "Create Account" : "Reset Password"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === "login"
              ? "Sign in to your Elaamy account"
              : mode === "register"
              ? "Join Elaamy for personalized gifting"
              : "We'll send you a reset link"}
          </p>
        </div>

        {/* Mode Toggle */}
        {mode !== "forgot" && (
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setMode("login"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Login
            </button>
            <button
              onClick={() => { setMode("register"); setError(""); setSuccess(""); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${mode === "register" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Register
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          {success && (
            <div className="flex items-center gap-3 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              {success}
            </div>
          )}
          {error && (
            <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-5 text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" onClick={() => setMode("forgot")} className="text-[#e21b22] font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : <><span>Sign In</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          {/* Register Form */}
          {mode === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (Optional)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => updateField("password", e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="Min 6 characters"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <input type="checkbox" required className="mt-0.5 rounded border-gray-300 text-pink-500 focus:ring-pink-500" />
                <span className="text-gray-600">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#e21b22] font-semibold hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-[#e21b22] font-semibold hover:underline">Privacy Policy</Link>
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? "Creating Account..." : <><span>Create Account</span> <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>
          )}

          {/* Forgot Password Form */}
          {mode === "forgot" && (
            <form onSubmit={handleForgot} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#e21b22] text-white rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <button type="button" onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="w-full text-sm text-gray-500 hover:text-gray-700">
                ← Back to Login
              </button>
            </form>
          )}

          {/* Social Login Divider */}
          <div className="flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to Elaamy's{" "}
          <Link href="/terms" className="text-gray-600 hover:underline">Terms</Link>
          {" "}&{" "}
          <Link href="/privacy" className="text-gray-600 hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
