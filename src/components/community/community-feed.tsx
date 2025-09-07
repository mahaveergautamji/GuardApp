'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { communityPosts } from '@/lib/mock-data';

export default function CommunityFeed() {
  const { toast } = useToast();

  const handlePostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const textarea = form.querySelector('textarea');
    if (textarea && textarea.value.trim()) {
      toast({
        title: 'Post Submitted',
        description: 'Your message has been shared with the community.',
      });
      textarea.value = '';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Share an Update</CardTitle>
            <CardDescription>
              Let the community know about your experience.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handlePostSubmit}>
            <CardContent>
              <Textarea
                placeholder="What's happening on your route?"
                className="resize-none"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full sm:w-auto">Post Update</Button>
            </CardFooter>
          </form>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold font-headline">Recent Posts</h2>
          {communityPosts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://picsum.photos/seed/${post.author}/40/40`}
                    data-ai-hint="people avatar"
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.time}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/90">{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-start gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments}</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Trending Topics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-col gap-2 text-sm">
                <p className="font-medium hover:text-primary cursor-pointer">#Route42ADelays</p>
                <p className="font-medium hover:text-primary cursor-pointer">#CentralStationSafety</p>
                <p className="font-medium hover:text-primary cursor-pointer">#NightBus</p>
                <p className="font-medium hover:text-primary cursor-pointer">#LostAndFound</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
