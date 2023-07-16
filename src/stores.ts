import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { Clock } from "$lib/components/typing/clock"

// Typing App
export const entires_typed: Writable<number> = writable(0)
export const time: Writable<number> = writable(0)
export const error_count: Writable<number> = writable(0)
export const clock: Writable<Clock> = writable(new Clock());