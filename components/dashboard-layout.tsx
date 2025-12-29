"use client";

import { useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Briefcase } from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center p-4 border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
                <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="mr-2">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-r-0">
                        <DashboardNav />
                    </SheetContent>
                </Sheet>
                <div className="flex items-center">
                    <img
                        src="https://i.postimg.cc/1RvV7gcX/CA_logo_banner_transparent.png"
                        alt="CareerAutomate"
                        className="h-8 object-contain"
                    />
                </div>
            </div>

            {/* Desktop Sidebar - Fixed */}
            <div className="hidden lg:block fixed left-0 top-0 h-full z-40">
                <DashboardNav />
            </div>

            {/* Main Content Area */}
            <div className="lg:pl-64 min-h-screen">
                {children}
            </div>
        </div>
    );
}
