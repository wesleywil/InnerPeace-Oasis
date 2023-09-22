<script lang="ts">
  import Timer from "$lib/components/timer/Timer.svelte";
  import TimerActions from "$lib/components/timer_actions/TimerActions.svelte";
  import TimerOptions from "$lib/components/timer_options/TimerOptions.svelte";
</script>

<main
  class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center"
>
  <TimerOptions />
  <Timer />
  <TimerActions />
</main>
