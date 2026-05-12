"use client";

import { FadeIn } from "@/components/shared/motion";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <FadeIn>
      <div className="mb-5 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm sm:text-base text-muted-foreground">{description}</p>
        )}
      </div>
    </FadeIn>
  );
}
