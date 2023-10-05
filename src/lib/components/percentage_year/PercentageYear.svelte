<script lang="ts">
  import type { MeditationData } from "../../../utils/interfaces";
  import { formatDate } from "../../../utils/utils";

  export let data: MeditationData[];

  // Initialize year-wise meditation counts
  const yearWiseMeditationCounts: { [key: string]: number } = {};

  // Calculate year-wise meditation counts
  data.forEach((dataSession) => {
    const year = formatDate(dataSession.end_time).slice(6, 12);

    // Count meditations
    if (year in yearWiseMeditationCounts) {
      yearWiseMeditationCounts[year]++;
    } else {
      yearWiseMeditationCounts[year] = 1;
    }
  });

  // Extract the years as an array
  const years = Object.keys(yearWiseMeditationCounts);

  // Calculate the total number of days meditated (count of data items)
  const totalDaysMeditated = data.length;

  // Calculate percentage in year for each year
  const percentageInYear: { [key: string]: number } = {};
  years.forEach((year) => {
    percentageInYear[year] =
      (yearWiseMeditationCounts[year] / totalDaysMeditated) * 100;
  });
</script>

<div class="w-full md:w-2/3 xl:w-1/3 h-96 p-2 overflow-y-auto">
  {#each years as year}
    <div
      class="px-2 py-1 flex justify-between text-2xl text-[#fdfefd] bg-[#292929] border-2 border-[#fdfefd] rounded"
    >
      <div class="pr-2 border-r-2">
        <h1>{year}</h1>
      </div>
      <div class="pr-2 border-r-2">
        <h1>Days Meditated: {yearWiseMeditationCounts[year]}</h1>
      </div>
      <div>
        <h1>Percentage in the Year: {percentageInYear[year]}%</h1>
      </div>
    </div>
  {/each}
</div>
