"use client"

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, User, Bot, Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockConversationDetails } from '@/lib/mock-data';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [conversation, setConversation] = useState<any>(null);
  
  useEffect(() => {
    // Simulate fetching conversation data
    const timer = setTimeout(() => {
      setConversation(mockConversationDetails);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [params.id]);
  
  const handleBack = () => {
    router.back();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isLoading ? (
                <Skeleton className="h-9 w-48" />
              ) : (
                `Conversation with ${conversation?.user}`
              )}
            </h1>
            <p className="text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-5 w-64 mt-1" />
              ) : (
                `Started ${format(new Date(conversation?.startTime), 'PPpp')}`
              )}
            </p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <div className="space-y-6 md:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue="messages">
                <TabsList className="mb-4">
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="messages">
                  <div className="space-y-6">
                    {isLoading ? (
                      [...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-20 w-full" />
                          </div>
                        </div>
                      ))
                    ) : (
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-6">
                          {conversation?.messages.map((message: any, index: number) => (
                            <div key={index} className="flex gap-4">
                              <div className={`flex h-10 w-10 rounded-full items-center justify-center ${message.sender === 'user' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                {message.sender === 'user' ? (
                                  <User className="h-5 w-5" />
                                ) : (
                                  <Bot className="h-5 w-5" />
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-medium">
                                    {message.sender === 'user' ? conversation.user : 'AI Assistant'}
                                  </p>
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(message.timestamp), 'h:mm a')}
                                  </span>
                                </div>
                                
                                <div className={`p-4 rounded-lg ${
                                  message.sender === 'user' 
                                    ? 'bg-muted' 
                                    : 'bg-primary/10'
                                }`}>
                                  <p>{message.content}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <div className="flex items-center justify-center text-muted-foreground p-12">
                    Message analytics will be displayed here
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Conversation Info</h3>
              
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-1">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-6 w-40" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      User
                    </p>
                    <p className="text-base font-medium">{conversation?.user}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date
                    </p>
                    <p className="text-base">
                      {format(new Date(conversation?.startTime), 'PP')}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      Duration
                    </p>
                    <p className="text-base">{conversation?.duration} minutes</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <p className="text-base">{conversation?.messages.length}</p>
                  </div>
                </div>
              )}
            </Card>
            
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Actions</h3>
              <div className="space-y-2">
                <Button className="w-full" disabled={isLoading}>Export Conversation</Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>Mark as Closed</Button>
                <Button variant="destructive" className="w-full" disabled={isLoading}>Delete</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}