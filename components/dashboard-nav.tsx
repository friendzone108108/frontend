// Shared navigation sidebar component
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, FileText, BarChart3, Bell, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Projects", href: "/projects", icon: FolderKanban },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Notifications", href: "/notifications", icon: Bell },
];

export function DashboardNav() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col bg-slate-900 border-r border-slate-700/50">
            {/* Logo */}
            <div className="flex h-16 items-center gap-2 border-b border-slate-700/50 px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                        <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        CareerAutomate
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive && "text-blue-400")} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-slate-700/50 p-4 space-y-1">
                <Link
                    href="/settings"
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        pathname === "/settings"
                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30"
                            : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    )}
                >
                    <Settings className={cn("h-5 w-5", pathname === "/settings" && "text-blue-400")} />
                    Settings
                </Link>
            </div>
        </div>
    );
}
