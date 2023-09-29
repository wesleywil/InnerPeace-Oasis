<script>
  import Menu from "$lib/components/menu/Menu.svelte";
  import "../app.css";
</script>

<div class="bg-[#fdfefd] pattern6">
  <Menu />
  <slot />
</div>

<style>
  .pattern6 {
    background-color: #24bb49;
    opacity: 0.9;
    background-image: repeating-radial-gradient(
        closest-side,
        transparent 0,
        #24bb49 30px
      ),
      repeating-linear-gradient(#24bb49, #07681f55);
  }
</style>
