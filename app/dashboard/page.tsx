// frontend/app/dashboard/page.tsx
"use client";

import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Briefcase,
    FileCheck,
    FolderGit2,
    FileText,
    AlertTriangle,
    TrendingUp,
    Clock,
    Target
} from "lucide-react";

export default function DashboardPage() {
    // Placeholder data - will be replaced with real API data
    const stats = {
        jobsApplied: 47,
        interviews: 8,
        certificates: 12,
        projects: 6,
        resumeVersions: 3,
    };

    const skillGaps = [
        { skill: "Kubernetes", importance: "high", progress: 30 },
        { skill: "System Design", importance: "medium", progress: 45 },
        { skill: "GraphQL", importance: "low", progress: 60 },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <DashboardNav />

            <div className="ml-64">
                <DashboardHeader
                    title="Dashboard"
                    subtitle="Welcome back! Here's your job search overview."
                />

                <main className="p-6 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Jobs Applied</CardTitle>
                                <Briefcase className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.jobsApplied}</div>
                                <p className="text-sm opacity-80 mt-1">
                                    <TrendingUp className="inline h-4 w-4 mr-1" />
                                    +12 this week
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Interviews</CardTitle>
                                <Target className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.interviews}</div>
                                <p className="text-sm opacity-80 mt-1">
                                    <Clock className="inline h-4 w-4 mr-1" />
                                    2 scheduled
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Certificates</CardTitle>
                                <FileCheck className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.certificates}</div>
                                <p className="text-sm opacity-80 mt-1">Verified & uploaded</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium opacity-90">Projects</CardTitle>
                                <FolderGit2 className="h-5 w-5 opacity-80" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold">{stats.projects}</div>
                                <p className="text-sm opacity-80 mt-1">Synced from GitHub</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Skill Gap Analysis */}
                        <Card className="lg:col-span-2 border-0 shadow-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                                            Skill Gap Alerts
                                        </CardTitle>
                                        <CardDescription>
                                            Based on your target roles and market trends
                                        </CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">View All</Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {skillGaps.map((gap, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{gap.skill}</span>
                                                <span className={`text-xs px-2 py-0.5 rounded-full ${gap.importance === 'high'
                                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                                        : gap.importance === 'medium'
                                                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    }`}>
                                                    {gap.importance}
                                                </span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{gap.progress}%</span>
                                        </div>
                                        <Progress value={gap.progress} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Resume Versions */}
                        <Card className="border-0 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    Resume Versions
                                </CardTitle>
                                <CardDescription>
                                    AI-generated resumes for different roles
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">Software Engineer</p>
                                            <p className="text-xs text-muted-foreground">Updated 2 days ago</p>
                                        </div>
                                        <Button size="sm" variant="ghost">View</Button>
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">Full Stack Developer</p>
                                            <p className="text-xs text-muted-foreground">Updated 5 days ago</p>
                                        </div>
                                        <Button size="sm" variant="ghost">View</Button>
                                    </div>
                                </div>
                                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-sm">Backend Developer</p>
                                            <p className="text-xs text-muted-foreground">Updated 1 week ago</p>
                                        </div>
                                        <Button size="sm" variant="ghost">View</Button>
                                    </div>
                                </div>
                                <Button className="w-full mt-2" variant="outline">
                                    Generate New Resume
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
