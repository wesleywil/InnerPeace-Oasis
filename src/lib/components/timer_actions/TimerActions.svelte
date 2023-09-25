<script lang="ts">
  import { timer } from "../../../store/timer";

  import music_5_minutes from "$lib/assets/musics/5m.mp3";
  import music_10_minutes from "$lib/assets/musics/10m.mp3";
  import music_15_minutes from "$lib/assets/musics/15m.mp3";
  import music_20_minutes from "$lib/assets/musics/20m.mp3";

  let toggle: boolean = false;
  $: toggle = $timer.toggle;
  let count: number = 0;
  $: count = $timer.count;

  const play = () => {
    if (count !== 0) {
      timer.startTimer();
      const music = document.getElementById("music") as HTMLAudioElement | null;
      if (!toggle) {
        music!.play();
      }
    }
  };

  const stop = () => {
    timer.stopTimer();
    const music = document.getElementById("music") as HTMLAudioElement | null;
    if (toggle) {
      music!.pause();
    }
  };

  const reset = () => {
    timer.resetTimer();
    const music = document.getElementById("music") as HTMLAudioElement | null;
    if (toggle) {
      timer.setToggle(false);
      music!.pause();
      music!.currentTime = 0;
    }
  };
</script>

<div class="flex justify-center gap-2">
  {#if count <= 300}
    <audio id="music" src={music_5_minutes} />
  {:else if count > 300 && count <= 600}
    <audio id="music" src={music_10_minutes} />
  {:else if count > 600 && count <= 900}
    <audio id="music" src={music_15_minutes} />
  {:else}
    <audio id="music" src={music_20_minutes} />
  {/if}

  <button
    on:click={play}
    class="md:mt-4 px-2 py-1 text-[#292929] text-xl md:text-2xl bg-[#24bb49] hover:bg-[#fdfefd] font-semibold border border-[#292929] rounded transform duration-700 ease-in-out"
    >Start</button
  >
  <button
    on:click={stop}
    class="md:mt-4 px-2 py-1 text-[#292929] text-xl md:text-2xl bg-[#24bb49] hover:bg-[#fdfefd] font-semibold border border-[#292929] rounded transform duration-700 ease-in-out"
    >Stop</button
  >
  <button
    on:click={reset}
    class="md:mt-4 px-2 py-1 text-[#292929] text-xl md:text-2xl bg-[#24bb49] hover:bg-[#fdfefd] font-semibold border border-[#292929] rounded transform duration-700 ease-in-out"
    >Reset</button
  >
</div>
