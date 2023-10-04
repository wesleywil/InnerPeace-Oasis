<script>
  import { page } from "$app/stores";

  import Menu from "$lib/components/menu/Menu.svelte";
  import NotAuthorized from "$lib/components/not_authorized/NotAuthorized.svelte";
  import "../app.css";
</script>

<svelte:head>
  <title>InnerPeace Oasis</title>
</svelte:head>

{#if $page.data.session && Object.keys($page.data.session).length}
  <div class="bg-[#fdfefd] pattern6">
    <Menu />
    <slot />
  </div>
{:else}
  <NotAuthorized />
{/if}

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
