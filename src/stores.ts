import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const has_started: Writable<boolean> = writable(false)
export const entires_typed: Writable<number> = writable(0)
export const time: Writable<number> = writable(0)
export const error_count: Writable<number> = writable(0)