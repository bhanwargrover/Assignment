"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Users, Clock, ArrowUpRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConversationChart } from '@/components/dashboard/conversation-chart';
import { RecentConversations } from '@/components/dashboard/recent-conversations';
import { Skeleton } from '@/components/ui/skeleton';
import { mockAnalyticsData } from '@/lib/mock-data';

export function DashboardOverview() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(mockAnalyticsData);
  const [timeRange, setTimeRange] = useState('week');

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter data based on time range
  const filterTimeRange = (range: string) => {
    setTimeRange(range);
    // In a real app, we would fetch new data based on the time range
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your chat activity and analytics.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Conversations"
          value={data.totalConversations}
          description="All time"
          icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />}
          trend={8.2}
          isLoading={isLoading}
        />
        
        <StatsCard
          title="Active Users"
          value={data.activeUsers}
          description="Last 30 days"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
          trend={12.5}
          isLoading={isLoading}
        />
        
        <StatsCard
          title="Avg. Response Time"
          value={`${data.avgResponseTime}s`}
          description="Last 7 days"
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          trend={-3.4}
          isLoading={isLoading}
        />
        
        <StatsCard
          title="Messages Sent"
          value={data.messagesSent}
          description="This month"
          icon={<MessageSquare className="h-5 w-5 text-muted-foreground" />}
          trend={24.1}
          isLoading={isLoading}
        />
      </div>
      
      <Tabs defaultValue="conversations" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="conversations">Conversations</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <TabsList className="bg-muted">
              <TabsTrigger 
                value="day" 
                onClick={() => filterTimeRange('day')}
                className={timeRange === 'day' ? 'bg-background' : ''}
              >
                Day
              </TabsTrigger>
              <TabsTrigger 
                value="week" 
                onClick={() => filterTimeRange('week')}
                className={timeRange === 'week' ? 'bg-background' : ''}
              >
                Week
              </TabsTrigger>
              <TabsTrigger 
                value="month" 
                onClick={() => filterTimeRange('month')}
                className={timeRange === 'month' ? 'bg-background' : ''}
              >
                Month
              </TabsTrigger>
              <TabsTrigger 
                value="year" 
                onClick={() => filterTimeRange('year')}
                className={timeRange === 'year' ? 'bg-background' : ''}
              >
                Year
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="conversations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="col-span-7 md:col-span-4">
              <CardHeader>
                <CardTitle>Conversation Trends</CardTitle>
                <CardDescription>
                  Number of conversations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[350px] flex items-center justify-center">
                    <Skeleton className="h-[350px] w-full" />
                  </div>
                ) : (
                  <div className="h-[350px]">
                    <ConversationChart data={data.conversationTrends} />
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card className="col-span-7 md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Conversations</CardTitle>
                <CardDescription>
                  Latest chat interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <RecentConversations conversations={data.recentConversations} />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Metrics</CardTitle>
              <CardDescription>
                Analysis of user engagement patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                User activity metrics will be available here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
              <CardDescription>
                Chat system response times and reliability metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-12 text-muted-foreground">
                Performance metrics will be available here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend: number;
  isLoading: boolean;
}

function StatsCard({ title, value, description, icon, trend, isLoading }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-7 w-1/2 mb-1" />
            <Skeleton className="h-4 w-full" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{description}</span>
              <span className={`ml-auto flex items-center ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend >= 0 ? '+' : ''}{trend}%
                <ArrowUpRight className={`ml-0.5 h-3 w-3 ${trend < 0 ? 'transform rotate-180' : ''}`} />
              </span>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}