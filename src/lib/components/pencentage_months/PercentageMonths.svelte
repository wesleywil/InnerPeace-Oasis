<script lang="ts">
  import { onMount } from "svelte";
  import type { MeditationData } from "../../../utils/interfaces";
  import { groupDataByMonth } from "../../../utils/utils";
  import MonthItem from "../month_item/MonthItem.svelte";

  export let data: MeditationData[];
  let selectedYear: number;

  let monthsData: Record<string, { days: number; percentage: number }> = {};

  onMount(() => {
    //Initialize the selectedYear with the current year
    selectedYear = new Date().getFullYear();

    monthsData = groupDataByMonth(data, selectedYear);
  });

  //Update monthsData when selectedYear changes
  $: {
    monthsData = groupDataByMonth(data, selectedYear);
  }
</script>

<div class="w-full md:w-2/3 xl:w-1/3 h-96 p-2 flex flex-col overflow-y-auto">
  <div
    class="p-1 flex flex-col-reverse md:flex-row items-center gap-2 bg-[#292929]/70 rounded"
  >
    <input
      type="number"
      bind:value={selectedYear}
      placeholder="Year"
      class="w-24 text-center rounded"
    />
    <span class="text-white"> choose the year to display the data </span>
  </div>
  <div class="flex flex-wrap justify-center gap-2">
    {#if data !== undefined && data !== null}
      {#each Object.keys(monthsData) as month}
        <MonthItem
          data={{
            month,
            days: monthsData[month].days,
            percentage: monthsData[month].percentage.toFixed(0),
          }}
        />
      {/each}
    {:else}
      <p>No data available</p>
    {/if}
  </div>
</div>
