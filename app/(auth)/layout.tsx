// frontend/app/(auth)/layout.tsx
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            {/* Header with Logo */}
            <header className="px-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl">C</span>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        CareerAutomate
                    </span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="text-center py-6 text-slate-400 text-sm">
                © 2025 CareerAutomate. Automate your career growth.
            </footer>
        </div>
    );
}
