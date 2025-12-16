// frontend/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardHeader } from "@/components/dashboard-header";
import { supabase } from "@/lib/supabase";
import { ArrowRight, FileText, Settings, Briefcase, Award, FolderGit2, FileStack, AlertTriangle, TrendingUp } from "lucide-react";

interface DashboardStats {
  jobSearchActive: boolean;
  certificatesCount: number;
  projectsCount: number;
  resumeVersions: number;
  skillGapAlerts: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    jobSearchActive: true,
    certificatesCount: 0,
    projectsCount: 0,
    resumeVersions: 0,
    skillGapAlerts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Get user name
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

      if (profile?.full_name) {
        setUserName(profile.full_name.split(' ')[0]);
      }

      const { data: jobStatus } = await supabase
        .from('job_search_status')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const { count: certsCount } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('verified', true);

      const { count: projectsCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { count: resumesCount } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('document_type', 'resume');

      const { count: skillGapsCount } = await supabase
        .from('skill_gaps')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'Open');

      setStats({
        jobSearchActive: jobStatus?.is_active ?? true,
        certificatesCount: certsCount ?? 0,
        projectsCount: projectsCount ?? 0,
        resumeVersions: resumesCount ?? 0,
        skillGapAlerts: skillGapsCount ?? 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJobSearch = async (checked: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase
        .from('job_search_status')
        .upsert({ user_id: user.id, is_active: checked });

      setStats({ ...stats, jobSearchActive: checked });
    } catch (error) {
      console.error('Error toggling job search:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardNav />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{userName}</span>! 👋
              </h1>
              <p className="text-slate-400">Here&apos;s an overview of your career automation progress.</p>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                  {/* Job Search Status */}
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-sm text-slate-400">Job Search</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xl font-bold ${stats.jobSearchActive ? 'text-green-400' : 'text-slate-500'}`}>
                          {stats.jobSearchActive ? 'Active' : 'Paused'}
                        </span>
                        <Switch
                          checked={stats.jobSearchActive}
                          onCheckedChange={toggleJobSearch}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Verified Certificates */}
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
                          <Award className="w-5 h-5 text-yellow-400" />
                        </div>
                        <span className="text-sm text-slate-400">Certificates</span>
                      </div>
                      <div className="text-3xl font-bold text-white">{stats.certificatesCount}</div>
                      <p className="text-xs text-slate-500 mt-1">Verified</p>
                    </CardContent>
                  </Card>

                  {/* Projects Synced */}
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                          <FolderGit2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-sm text-slate-400">Projects</span>
                      </div>
                      <div className="text-3xl font-bold text-white">{stats.projectsCount}</div>
                      <p className="text-xs text-slate-500 mt-1">Synced from GitHub</p>
                    </CardContent>
                  </Card>

                  {/* Resume Versions */}
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                          <FileStack className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-sm text-slate-400">Resumes</span>
                      </div>
                      <div className="text-3xl font-bold text-white">
                        {stats.resumeVersions}<span className="text-lg text-slate-500">/10</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">AI-generated versions</p>
                    </CardContent>
                  </Card>

                  {/* Skill Gap Alerts */}
                  <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="text-sm text-slate-400">Skill Gaps</span>
                      </div>
                      <div className="text-3xl font-bold text-red-400">{stats.skillGapAlerts}</div>
                      <p className="text-xs text-slate-500 mt-1">Need attention</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      onClick={() => router.push('/projects')}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2"
                    >
                      <FolderGit2 className="w-4 h-4" />
                      View Projects
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/documents')}
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 gap-2"
                    >
                      <FileText className="w-4 h-4" />
                      Manage Documents
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/reports')}
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 gap-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      View Reports
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/settings')}
                      className="bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50 gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                  </div>
                </div>

                {/* Recent Activity Placeholder */}
                <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">Resume updated for Software Engineer role</p>
                          <p className="text-xs text-slate-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">New project synced from GitHub</p>
                          <p className="text-xs text-slate-500">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                        <div className="flex-1">
                          <p className="text-sm text-white">Certificate verified: AWS Solutions Architect</p>
                          <p className="text-xs text-slate-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
