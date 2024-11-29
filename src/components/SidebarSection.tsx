import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarSectionProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  children: React.ReactNode;
}

export function SidebarSection({ title, icon: Icon, isOpen, children }: SidebarSectionProps) {
  return (
    <div>
      <div className="px-4 py-2 flex items-center gap-3 text-gray-400 text-sm">
        <Icon className="w-4 h-4" />
        <span className={isOpen ? 'block' : 'hidden'}>{title}</span>
      </div>
      {isOpen && (
        <div className="mt-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}