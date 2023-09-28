<script lang="ts">
  import type { PageData } from "./$types";
  import PercentageYear from "$lib/components/percentage_year/PercentageYear.svelte";
  import type { MeditationData } from "../../utils/interfaces";
  import PercentageMonths from "$lib/components/pencentage_months/PercentageMonths.svelte";

  export let data: PageData;

  let changeOptions: boolean = true;

  let meditateData: MeditationData[] = [];

  if (data.data) {
    meditateData = data.data;
  }

  const switchOptions = (opt: boolean) => {
    changeOptions = opt;
  };
</script>

<main
  class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center"
>
  <div
    class="w-full md:w-2/3 xl:w-1/3 my-2 p-1 flex flex-col justify-center items-center text-[#fdfefd] bg-[#292929]/70 rounded"
  >
    <h1 class="text-2xl md:text-4xl font-bold">Dashboard</h1>
  </div>
  <!-- Options -->
  <div class="w-full md:w-2/3 xl:w-1/3 p-2 flex flex-col rounded-t bg-black/70">
    <h2 class="mb-2 text-white text-xl md:text-2xl font-semibold">Options</h2>
    <div class="flex gap-2 justify-center">
      <button
        on:click={() => switchOptions(true)}
        class="px-2 py-1 text-xl font-bold bg-[#fdfefd] text-[#292929] rounded"
        >Years</button
      >
      <button
        on:click={() => switchOptions(false)}
        class="px-2 py-1 text-xl font-bold bg-[#fdfefd] text-[#292929] rounded"
        >Months</button
      >
    </div>
  </div>

  {#if changeOptions}
    <PercentageYear data={meditateData} />
  {:else}
    <PercentageMonths />
  {/if}
</main>
