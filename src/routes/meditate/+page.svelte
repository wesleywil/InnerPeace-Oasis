<script lang="ts">
  export let data;
  import { page } from "$app/stores";
  import { timer } from "../../store/timer";
  import { timerCompleted } from "../../store/meditation";

  import Timer from "$lib/components/timer/Timer.svelte";
  import TimerActions from "$lib/components/timer_actions/TimerActions.svelte";
  import TimerOptions from "$lib/components/timer_options/TimerOptions.svelte";

  async function handleMeditationCompletion() {
    const currentDate = new Date();
    const mysqlDate = currentDate.toISOString().split("T")[0];
    const req = await fetch("http://localhost:5173/api/meditation", {
      method: "POST",
      body: JSON.stringify({
        userId: $page.data.session?.user?.id,
        end_time: mysqlDate,
        duration: $timer.initialCounter,
        notes: "testing...",
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log("result=> ", req);
  }

  $: {
    if ($timerCompleted) {
      handleMeditationCompletion();
    }
  }
</script>

<main
  class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center"
>
  <div
    class="w-full md:w-2/3 xl:w-1/3 my-2 p-1 flex flex-col justify-center items-center text-[#fdfefd] bg-[#292929]/70 rounded"
  >
    <h1 class="text-2xl font-bold">Username</h1>
    <h1 class=" text-xl font-semibold">{data.data?.name}</h1>
  </div>
  <TimerOptions />
  <Timer />
  <TimerActions />
</main>
