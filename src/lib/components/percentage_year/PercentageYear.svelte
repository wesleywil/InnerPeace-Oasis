<script lang="ts">
  import type { MeditationData } from "../../../utils/interfaces";
  import { formatDate } from "../../../utils/utils";

  export let data: MeditationData[];

  const numberOfDaysMeditated = data.length || 0;

  const percentageInYear = (numberOfDaysMeditated / 365) * 100;
</script>

<div>
  {#if data !== undefined && data !== null}
    {#each data as dataSession (dataSession.userId)}
      <div
        class="flex bg-black rounded text-white text-2xl rounded border overflow-hidden"
      >
        <h1 class="p-2 border-r">
          {formatDate(dataSession.end_time).slice(6, 12)}
        </h1>

        <h1 class="p-2 border-r">Days Meditated: {numberOfDaysMeditated}</h1>
        <h1 class="p-2">
          Percentage in the Year: {percentageInYear.toFixed(2)}%
        </h1>
      </div>
    {/each}
  {:else}
    <p>No data available</p>
  {/if}
</div>
