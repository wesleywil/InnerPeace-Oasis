import { derived } from "svelte/store";
import { timer } from "./timer";

export const timerCompleted = derived(
    timer,
    ($timer)=> $timer.count === 0 && $timer.timerSet !== 0
)
