// frontend/app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Lock, User, Chrome, Github, CheckCircle } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [step, setStep] = useState<"signup" | "verify">("signup");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleGoogleSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://127.0.0.1:8000'}/auth/google/login`;
    };

    const handleGitHubSignUp = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://127.0.0.1:8000'}/auth/github/login`;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://127.0.0.1:8000'}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Registration failed");
            }

            setMessage("OTP sent to your email!");
            setStep("verify");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://127.0.0.1:8000'}/auth/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Verification failed");
            }

            localStorage.setItem("access_token", data.access_token);
            router.push("/onboarding");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8">
                {step === "signup" ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
                            <p className="text-slate-400">Start automating your career growth</p>
                        </div>

                        {/* Error/Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        {/* OAuth Buttons */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleSignUp}
                                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:text-white"
                            >
                                <Chrome className="mr-2 h-5 w-5 text-red-400" />
                                Google
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGitHubSignUp}
                                className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50 hover:text-white"
                            >
                                <Github className="mr-2 h-5 w-5" />
                                GitHub
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-slate-800/50 text-slate-400">Or sign up with email</span>
                            </div>
                        </div>

                        {/* Signup Form */}
                        <form onSubmit={handleSignup} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-300">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-blue-500/25"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </form>

                        {/* Login Link */}
                        <p className="text-center mt-8 text-slate-400">
                            Already have an account?{" "}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </>
                ) : (
                    <>
                        {/* OTP Verification */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">Verify Email</h1>
                            <p className="text-slate-400">
                                We&apos;ve sent a 6-digit OTP to<br />
                                <span className="text-blue-400 font-medium">{email}</span>
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleVerifyOTP} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-slate-300">Enter OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                    className="text-center text-2xl tracking-widest bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-green-500/25"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Continue"
                                )}
                            </Button>
                        </form>

                        <p className="text-center mt-6 text-slate-400 text-sm">
                            Didn&apos;t receive the code?{" "}
                            <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Resend OTP
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
