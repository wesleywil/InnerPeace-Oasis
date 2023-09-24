<script lang="ts">
  import { timer } from "../../../store/timer";

  let count: number = 0;
  $: count = $timer.count;

  let toggle: boolean = false;
  $: toggle = $timer.toggle;
</script>

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
      background: radial-gradient(closest-side, #95ffb2, #24bb49);
    }
    25% {
      -webkit-transform: scale(0.9);
      background: radial-gradient(closest-side, #95ffb2, #24bb49);
    }
    60% {
      -webkit-transform: scale(1);
      background: radial-gradient(closest-side, #95ffb2, #24bb49);
    }
    100% {
      -webkit-transform: scale(0.9);
      background: radial-gradient(closest-side, #95ffb2, #24bb49);
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
