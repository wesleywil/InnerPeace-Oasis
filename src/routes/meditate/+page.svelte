<script lang="ts">
  export let data;

  import { timer } from "../../store/timer";
  import { timerCompleted } from "../../store/meditation";

  import Timer from "$lib/components/timer/Timer.svelte";
  import TimerActions from "$lib/components/timer_actions/TimerActions.svelte";
  import TimerOptions from "$lib/components/timer_options/TimerOptions.svelte";
</script>

<main
  class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center"
>
  <div
    class="w-full md:w-2/3 xl:w-1/3 my-2 p-1 flex flex-col justify-center items-center text-[#fdfefd] bg-[#292929]/70 rounded"
  >
    <h1 class="text-2xl font-bold">Username</h1>
    <h1 class=" text-xl font-semibold">{data.data?.username}</h1>
  </div>

  <!-- {#if $timer.timerSet !== 0}
    <p>Timer: {$timer.count} seconds</p>
    <p>Timer is running</p>
    {#if $timerCompleted}
      <p>Meditation completed naturally!</p>
      <p>Do something here...</p>
    {/if}
  {/if} -->
  <TimerOptions />
  <Timer />
  <TimerActions />
</main>
