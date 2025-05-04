"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { 
  Search, 
  MessageSquare, 
  Filter,
  CheckCircle2,
  XCircle,
  ArrowUpDown
} from 'lucide-react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { mockConversations } from '@/lib/mock-data';

export default function ConversationsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState(mockConversations);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const filteredConversations = conversations
    .filter(convo => {
      // Apply status filter
      if (statusFilter !== 'all' && convo.status !== statusFilter) {
        return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          convo.user.toLowerCase().includes(query) ||
          convo.lastMessage.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/conversations/${id}`);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="text-muted-foreground">
            Browse and manage all your chat conversations.
          </p>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conversations</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">User</TableHead>
                    <TableHead className="hidden md:table-cell">Last Message</TableHead>
                    <TableHead className="w-[150px]">Status</TableHead>
                    <TableHead 
                      className="w-[150px] cursor-pointer"
                      onClick={toggleSortDirection}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
                        <TableCell className="hidden md:table-cell"><Skeleton className="h-5 w-full" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
                      </TableRow>
                    ))
                  ) : filteredConversations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <MessageSquare className="h-10 w-10 mb-2" />
                          <p>No conversations found</p>
                          {searchQuery && (
                            <p className="text-sm">Try adjusting your search</p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <TableRow 
                        key={conversation.id}
                        className="cursor-pointer"
                        onClick={() => handleRowClick(conversation.id)}
                      >
                        <TableCell className="font-medium">{conversation.user}</TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground truncate max-w-[300px]">
                          {conversation.lastMessage}
                        </TableCell>
                        <TableCell>
                          <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                            {conversation.status === 'active' ? (
                              <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                            ) : (
                              <XCircle className="mr-1 h-3.5 w-3.5" />
                            )}
                            {conversation.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(conversation.timestamp), 'MMM d, yyyy')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}