<script lang="ts">
  import { timer } from "../../../store/timer";
</script>

<div class="flex justify-center gap-2">
  <button
    on:click={() => timer.startTimer()}
    class="md:mt-4 px-2 py-1 text-[#fdfefd] text-3xl md:text-5xl bg-[#24bb49] hover:bg-[#07681f] font-semibold rounded-xl transform duration-700 ease-in-out"
    >Start</button
  >
  <button
    on:click={() => timer.stopTimer()}
    class="md:mt-4 px-2 py-1 text-[#fdfefd] text-3xl md:text-5xl bg-[#24bb49] hover:bg-[#07681f] font-semibold rounded-xl transform duration-700 ease-in-out"
    >Stop</button
  >
  <button
    on:click={() => timer.resetTimer()}
    class="md:mt-4 px-2 py-1 text-[#fdfefd] text-3xl md:text-5xl bg-[#24bb49] hover:bg-[#07681f] font-semibold rounded-xl transform duration-700 ease-in-out"
    >Reset</button
  >
</div>
