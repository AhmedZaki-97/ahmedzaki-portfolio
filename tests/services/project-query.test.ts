import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPublishedProjects, getFeaturedProjects } from '@/features/projects/services';

const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockOr = vi.fn();
const mockOrder = vi.fn();
const mockLimit = vi.fn();
const mockRange = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockImplementation(() => ({
    from: vi.fn().mockReturnValue({
      select: (...args: unknown[]) => {
        mockSelect(...args);
        const chain: Record<string, unknown> = {};
        chain.eq = (...eqArgs: unknown[]) => {
          mockEq(...eqArgs);
          return chain;
        };
        chain.or = (...orArgs: unknown[]) => {
          mockOr(...orArgs);
          return chain;
        };
        chain.order = (...orderArgs: unknown[]) => {
          mockOrder(...orderArgs);
          return chain;
        };
        chain.limit = (...limitArgs: unknown[]) => {
          mockLimit(...limitArgs);
          return Promise.resolve({ data: [{ id: 'p1', title: 'Featured Project', status: 'published' }], error: null });
        };
        chain.range = (...rangeArgs: unknown[]) => {
          mockRange(...rangeArgs);
          return chain;
        };
        chain.then = (resolve: (val: unknown) => unknown) => {
          return Promise.resolve({
            data: [{ id: 'p1', title: 'Sample Project', status: 'published' }],
            count: 1,
            error: null,
          }).then(resolve);
        };
        return chain;
      },
    }),
  })),
}));

describe('Project Services Query Security', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getPublishedProjects always restricts results to published status', async () => {
    const result = await getPublishedProjects();

    expect(mockEq).toHaveBeenCalledWith('status', 'published');
    expect(result.projects).toHaveLength(1);
    expect(result.count).toBe(1);
  });

  it('getPublishedProjects applies category filter when specified', async () => {
    await getPublishedProjects({ category: 'Dashboard' });

    expect(mockEq).toHaveBeenCalledWith('status', 'published');
    expect(mockEq).toHaveBeenCalledWith('category', 'Dashboard');
  });

  it('getPublishedProjects applies search query via ILIKE on title and description', async () => {
    await getPublishedProjects({ search: 'React' });

    expect(mockOr).toHaveBeenCalledWith('title.ilike.%React%,short_description.ilike.%React%');
  });

  it('getFeaturedProjects restricts to published status AND is_featured=true', async () => {
    const result = await getFeaturedProjects();

    expect(mockEq).toHaveBeenCalledWith('status', 'published');
    expect(mockEq).toHaveBeenCalledWith('is_featured', true);
    expect(mockLimit).toHaveBeenCalledWith(6);
    expect(result).toHaveLength(1);
  });
});
