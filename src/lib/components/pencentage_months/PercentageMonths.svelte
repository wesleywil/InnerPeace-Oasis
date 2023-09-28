<script lang="ts">
  import MonthItem from "../month_item/MonthItem.svelte";
</script>

<div class="w-full md:w-2/3 xl:w-1/3 flex flex-col">
  <div class="p-1 flex gap-2 bg-[#292929]/70 rounded">
    <input type="text" placeholder="Year" class="w-24 text-center rounded" />
    <button
      class="px-2 font-semibold hover:text-[#fdfefd] bg-[#fdfefd] hover:bg-[#24bb49] rounded transform duration-500 ease-in-out"
      >Change</button
    >
  </div>

  <MonthItem />
</div>
