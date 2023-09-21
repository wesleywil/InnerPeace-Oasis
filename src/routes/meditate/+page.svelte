<script lang="ts">
  let toggle: boolean;
  let count: number = 30;
  let timer: any = null;

  function startAnimation() {
    toggle = true;
    if (timer === null) {
      timer = setInterval(() => {
        if (count > 0) {
          count--;
        } else {
          clearInterval(timer);
          timer = null;
          toggle = false;
        }
      }, 1000);
    }
  }

  function stopAnimation() {
    toggle = false;
    clearInterval(timer);
    timer = null;
    count = 30;
  }
</script>

<main
  class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center"
>
  <div class="flex justify-center gap-2">
    <button
      class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
      >5m</button
    >
    <button
      class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
      >10m</button
    >
    <button
      class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
      >15m</button
    >
    <button
      class="px-2 py-1 font-bold bg-[#292929] hover:bg-[#292929]/70 text-[#fdfefd] hover:text-[#24bb49] rounded transform duration-500 ease-in"
      >20m</button
    >
  </div>
  <div
    class="md:h-[26rem] h-[20rem] w-[20rem] md:w-[26rem] flex items-center justify-center bg-[#292929] rounded-full"
  >
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="{toggle
        ? 'breathing-div'
        : ''} md:h-[25rem] h-[19rem] w-[19rem] md:w-[25rem] flex flex-col items-center justify-center bg-[#24bb49] rounded-full"
    >
      <h1
        class="{toggle ? 'breathing-h1' : ''} text-8xl text-[#292929] font-bold"
      >
        {count}
      </h1>
    </div>
  </div>
  <div class="flex justify-center gap-2">
    <button
      on:click={startAnimation}
      class="md:mt-4 px-2 py-1 text-[#fdfefd] text-3xl md:text-5xl bg-[#24bb49] hover:bg-[#07681f] font-semibold rounded-xl transform duration-700 ease-in-out"
      >Start</button
    >
    <button
      on:click={stopAnimation}
      class="md:mt-4 px-2 py-1 text-[#fdfefd] text-3xl md:text-5xl bg-[#24bb49] hover:bg-[#07681f] font-semibold rounded-xl transform duration-700 ease-in-out"
      >Stop</button
    >
  </div>
</main>

<style>
  .breathing-div {
    animation: breathing 10s ease infinite alternate;
  }

  .breathing-h1 {
    animation: breathing2 10s ease infinite alternate;
  }

  @keyframes breathing {
    0% {
      -webkit-transform: scale(1);
    }
    25% {
      -webkit-transform: scale(0.9);
    }
    60% {
      -webkit-transform: scale(1);
    }
    100% {
      -webkit-transform: scale(0.9);
    }
  }

  @keyframes breathing2 {
    0% {
      -webkit-transform: scale(0.9);
    }
    25% {
      -webkit-transform: scale(1);
    }
    60% {
      -webkit-transform: scale(0.9);
    }
    100% {
      -webkit-transform: scale(1);
    }
  }
</style>
