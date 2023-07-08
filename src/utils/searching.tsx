import APPLICATION_INDEX from '@applications/index';
import Fuse from 'fuse.js';

interface SearchAppResult {
  cmd: string;
  cmdVariants: string[];
}

const searchFuse = new Fuse(Object.values(APPLICATION_INDEX), {
  isCaseSensitive: true,
  includeScore: true,
  includeMatches: true,
  keys: [
    {
      name: 'cmd',
      weight: 0.35,
    },
    {
      name: 'alias',
      weight: 0.35,
    },
    {
      name: 'name',
      weight: 0.2,
    },
    {
      name: 'desc',
      weight: 0.1,
    },
  ],
});

export function searchApplicationIndex(
  input: string,
  maxOut: number = 2
): SearchAppResult[] {
  const result: SearchAppResult[] = searchFuse.search(input).map((r) => {
    return {
      cmd: r.item.cmd,
      cmdVariants: [r.item.cmd, ...r.item.alias],
    };
  });

  return result.slice(0, maxOut);
}
