import { Challenge, normalizeChallenge } from '../types';
import { SFIDE_TYPESCRIPT } from '../data/challenges_typescript';
import { SFIDE_GIT } from '../data/challenges_git';

export const INITIAL_TYPESCRIPT_CHALLENGES: Challenge[] = SFIDE_TYPESCRIPT.map((sfida: any) => 
  normalizeChallenge({ ...sfida, trackId: 'typescript' })
);

export const INITIAL_GIT_CHALLENGES: Challenge[] = SFIDE_GIT.map((sfida: any) => 
  normalizeChallenge({ ...sfida, trackId: 'git' })
);

export const INITIAL_TRACK_CHALLENGES: Challenge[] = [
  ...INITIAL_TYPESCRIPT_CHALLENGES,
  ...INITIAL_GIT_CHALLENGES,
];
