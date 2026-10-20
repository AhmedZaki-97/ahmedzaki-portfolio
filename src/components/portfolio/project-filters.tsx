'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCallback, useState, useTransition } from 'react';

interface ProjectFiltersProps {
  categories: string[];
}

export function ProjectFilters({ categories }: ProjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'All';
  const [search, setSearch] = useState(currentSearch);

  const updateFilters = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'All') {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });
      startTransition(() => {
        router.push(`/projects?${newParams.toString()}`);
      });
    },
    [router, searchParams]
  );

  const allCategories = ['All', ...categories];

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search projects..."
          className="pl-10"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters({ search: e.target.value });
          }}
        />
      </div>

      {/* Category filters */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => updateFilters({ category })}
              className="focus-ring rounded-full"
            >
              <Badge
                variant={currentCategory === category ? 'default' : 'outline'}
                className={cn(
                  'cursor-pointer transition-colors px-3 py-1',
                  currentCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent',
                  isPending && 'opacity-70'
                )}
              >
                {category}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
