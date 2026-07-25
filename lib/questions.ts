import { Sfida, TrackId, normalizeChallenge } from './types';
import { INITIAL_TYPESCRIPT_CHALLENGES, INITIAL_GIT_CHALLENGES } from './content/initial_challenges';
import { DOCKER_CHALLENGES } from './challenges_docker';
import { POSTGRES_CHALLENGES } from './challenges_postgres';
import { AI_NATIVE_CHALLENGES } from './challenges_ai';
import { SFIDE_PYTHON } from './data/challenges_python';

export { SFIDE_PYTHON };

// Backward compatibility export
export const TUTTE_LE_SFIDE: Sfida[] = SFIDE_PYTHON;

export function getQuestionsForTrack(trackId: TrackId): Sfida[] {
  let list: Sfida[] = [];
  switch (trackId) {
    case 'typescript':
      list = INITIAL_TYPESCRIPT_CHALLENGES;
      break;
    case 'git':
      list = INITIAL_GIT_CHALLENGES;
      break;
    case 'docker':
      list = DOCKER_CHALLENGES;
      break;
    case 'postgres':
      list = POSTGRES_CHALLENGES;
      break;
    case 'prompt_engineering':
    case 'mcp':
    case 'claude_code':
      list = AI_NATIVE_CHALLENGES.filter((c) => c.trackId === trackId);
      break;
    case 'python':
    default:
      list = SFIDE_PYTHON;
      break;
  }
  return list.map(normalizeChallenge);
}

export function getAllQuestions(): Sfida[] {
  return [
    ...SFIDE_PYTHON,
    ...INITIAL_TYPESCRIPT_CHALLENGES,
    ...INITIAL_GIT_CHALLENGES,
    ...DOCKER_CHALLENGES,
    ...POSTGRES_CHALLENGES,
    ...AI_NATIVE_CHALLENGES,
  ].map(normalizeChallenge);
}
