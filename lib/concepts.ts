import { Concetto, TrackId, normalizeConcept } from './types';
import { CONCETTI_TYPESCRIPT } from './data/concepts_typescript';
import { CONCETTI_GIT } from './data/concepts_git';
import { CONCETTI_PYTHON } from './data/concepts_python';

export { CONCETTI_PYTHON };

// Backward compatibility export
export const CONCETTI: Concetto[] = CONCETTI_PYTHON;

export function getConceptsForTrack(trackId: TrackId): Concetto[] {
  let list: Concetto[] = [];
  switch (trackId) {
    case 'typescript':
      list = CONCETTI_TYPESCRIPT;
      break;
    case 'git':
      list = CONCETTI_GIT;
      break;
    case 'python':
    default:
      list = CONCETTI_PYTHON;
      break;
  }
  return list.map((c) => normalizeConcept(c));
}
