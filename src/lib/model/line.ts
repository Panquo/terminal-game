import { Status } from './enum';
export type Line = string | { text: string; delay?: number; status?: Status };
