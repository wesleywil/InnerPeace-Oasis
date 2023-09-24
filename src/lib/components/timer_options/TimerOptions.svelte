<script lang="ts">
  import { timer } from "../../../store/timer";

  let counter: number = 0;
  $: counter = $timer.count;

  const setTimer = (count: number) => {
    if (counter === 0) {
      timer.switchCounter(count);
    }
  };
</script>

<div class="flex justify-center gap-2">
  <button
    on:click={() => setTimer(5)}
    class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
    >5m</button
  >
  <button
    on:click={() => setTimer(10)}
    class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
    >10m</button
  >
  <button
    on:click={() => setTimer(15)}
    class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
    >15m</button
  >
  <button
    on:click={() => setTimer(20)}
    class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
    >20m</button
  >
</div>
