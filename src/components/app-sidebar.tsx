'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  MessageSquareWarning,
  Shield,
  ShieldAlert,
  Map,
  User,
  Info,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/reporting',
    label: 'Report Incident',
    icon: MessageSquareWarning,
  },
  {
    href: '/risk-assessment',
    label: 'Risk Assessment',
    icon: ShieldAlert,
  },
  {
    href: '/routes',
    label: 'Route Planner',
    icon: Map,
  },
  {
    href: '/credits',
    label: 'Credits',
    icon: Info,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Shield className="size-8 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">
            TransitGuard
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/40/40" data-ai-hint="user avatar" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <span className="truncate">Mahaveer gautam</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
