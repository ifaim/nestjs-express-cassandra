import * as merge from 'merge-deep';

export function mergeDeep(target, sources): object {
  return merge(target, sources);
}
