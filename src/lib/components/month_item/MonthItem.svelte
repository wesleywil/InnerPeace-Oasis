<script lang="ts">
  export let data: {
    month: string;
    days: number;
    percentage: string;
  };
</script>

<div
  class="mt-2 w-24 h-24 bg-[#fdfefd] flex flex-col rounded-xl shadow overflow-hidden"
>
  <h2 class="text-[#fdfefd] bg-[#292929]">{data.month}</h2>
  <div class="self-center h-fit mt-2 ml-2 flex justify-center items-center">
    <h1 class="font-bold text-5xl">{data.days}</h1>
    <h3 class="self-end text-sm font-semibold">{data.percentage}%</h3>
  </div>
</div>
