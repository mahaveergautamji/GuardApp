import * as React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <SidebarTrigger className="md:hidden" />
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-1 text-base sm:text-lg">{description}</p>
        )}
      </div>
    </div>
  );
}
