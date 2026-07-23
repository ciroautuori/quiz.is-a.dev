import { Sfida } from '../types';
import { SFIDE_TYPESCRIPT } from '../data/sfide_typescript';
import { SFIDE_GIT } from '../data/sfide_git';

export const INITIAL_TYPESCRIPT_CHALLENGES: Sfida[] = SFIDE_TYPESCRIPT.map((sfida) => ({
  ...sfida,
  trackId: 'typescript',
}));

export const INITIAL_GIT_CHALLENGES: Sfida[] = SFIDE_GIT.map((sfida) => ({
  ...sfida,
  trackId: 'git',
}));

export const INITIAL_TRACK_CHALLENGES: Sfida[] = [
  ...INITIAL_TYPESCRIPT_CHALLENGES,
  ...INITIAL_GIT_CHALLENGES,
];
