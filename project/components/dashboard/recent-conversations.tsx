"use client"

import { useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquareText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
  status: 'active' | 'closed';
  unread: number;
}

interface RecentConversationsProps {
  conversations: Conversation[];
}

export function RecentConversations({ conversations }: RecentConversationsProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
        <MessageSquareText className="h-10 w-10 mb-3" />
        <p>No recent conversations</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conversations.map((conversation) => (
        <Link
          key={conversation.id}
          href={`/dashboard/conversations/${conversation.id}`}
          className={cn(
            "block -mx-2 px-2 py-3 rounded-lg transition-colors",
            "hover:bg-muted relative"
          )}
        >
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">{conversation.user}</div>
                <div className="flex items-center space-x-2">
                  <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                    {conversation.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conversation.timestamp), { addSuffix: true })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {conversation.lastMessage}
              </p>
              {conversation.unread > 0 && (
                <div className="absolute top-3 right-3 h-2 w-2 bg-primary rounded-full" />
              )}
            </>
          )}
        </Link>
      ))}
    </div>
  );
}