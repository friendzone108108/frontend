// Shared header component with profile avatar and logout
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";

export function DashboardHeader() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        fetchUserProfile();
        fetchUnreadNotifications();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data: profile } = await supabase
                .from('profiles')
                .select('full_name, profile_photo_url')
                .eq('id', user.id)
                .single();

            setUserProfile({
                name: profile?.full_name || user.email?.split('@')[0] || 'User',
                email: user.email,
                photo: profile?.profile_photo_url,
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchUnreadNotifications = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { count } = await supabase
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)
                .eq('is_read', false);

            setUnreadCount(count || 0);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            localStorage.removeItem('access_token');
            router.push('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex items-center justify-between gap-4 px-8 py-4 border-b border-slate-700/50 bg-slate-900/50">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    placeholder="Search projects, documents..."
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications Bell */}
                <button
                    onClick={() => router.push('/notifications')}
                    className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="focus:outline-none">
                            <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-slate-700 hover:ring-blue-500/50 transition-all">
                                <AvatarImage src={userProfile?.photo} alt={userProfile?.name} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                                    {userProfile?.name ? getInitials(userProfile.name) : 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700 text-white">
                        <DropdownMenuLabel>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium text-white">{userProfile?.name || 'User'}</p>
                                <p className="text-xs text-slate-400">{userProfile?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={() => router.push('/settings')} className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
                            Profile Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/dashboard')} className="text-slate-300 hover:text-white hover:bg-slate-700 cursor-pointer">
                            Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-700" />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:text-red-300 hover:bg-slate-700 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
