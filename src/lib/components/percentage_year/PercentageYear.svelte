<script lang="ts">
  import type { MeditationData } from "../../../utils/interfaces";
  import { formatDate } from "../../../utils/utils";

  export let data: MeditationData[];

  const numberOfDaysMeditated = data.length || 0;

  const percentageInYear = (numberOfDaysMeditated / 365) * 100;
</script>

<div class="w-full md:w-2/3 xl:w-1/3 h-96 p-2 overflow-y-auto">
  {#if data !== undefined && data !== null}
    {#each data as dataSession (dataSession.userId)}
      <div
        class="flex bg-black rounded text-white md:text-2xl rounded border overflow-hidden"
      >
        <div class="p-2 flex items-center border-r">
          <h1>
            {formatDate(dataSession.end_time).slice(6, 12)}
          </h1>
        </div>

        <h1 class="p-2 border-r">
          Days Meditated: {numberOfDaysMeditated}
        </h1>
        <h1 class="p-2">
          Percentage in the Year: {percentageInYear.toFixed(2)}%
        </h1>
      </div>
    {/each}
  {:else}
    <p>No data available</p>
  {/if}
</div>
