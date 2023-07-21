import APPLICATION_INDEX from '@/applications';
import { type AppMeta } from '@type/ApplicationTypes';
import Fuse from 'fuse.js';

interface SearchAppResult {
  cmd: string;
  cmdVariants: string[];
}

function helperGetFuse() {
  return new Fuse(Object.values(APPLICATION_INDEX), {
    isCaseSensitive: true,
    includeScore: true,
    includeMatches: true,
    distance: 10,
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
}

let searchFuse: Fuse<AppMeta> | undefined;
export function searchApplicationIndex(
  input: string,
  maxOut: number = 2,
): SearchAppResult[] {
  if (searchFuse === undefined) {
    searchFuse = helperGetFuse();
  }

  const result: SearchAppResult[] = searchFuse.search(input).map((r) => {
    return {
      cmd: r.item.cmd,
      cmdVariants: [r.item.cmd, ...r.item.alias],
    };
  });

  return result.slice(0, maxOut);
}
