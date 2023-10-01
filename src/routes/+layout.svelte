<script>
  import { page } from "$app/stores";
  import { signIn } from "@auth/sveltekit/client";

  import Menu from "$lib/components/menu/Menu.svelte";
  import NotAuthorized from "$lib/components/not_authorized/NotAuthorized.svelte";
  import "../app.css";
</script>

<svelte:head>
  <title>InnerPeace Oasis</title>
</svelte:head>

<!-- <div class="bg-[#fdfefd] pattern6">
  <Menu />
  <slot />
</div> -->

{#if $page.data.session && Object.keys($page.data.session).length}
  <div class="bg-[#fdfefd] pattern6">
    <Menu />
    <slot />
  </div>
{:else}
  <main
    class="min-h-screen min-w-screen p-2 flex flex-col items-center justify-center gap-2 text-[#292929] text-center bg-[#fdfefd] pattern6"
  >
    <div class="p-2 flex flex-col bg-[#292929]/80 rounded">
      <h1 class="text-2xl text-[#fdfefd] font-bold">
        YOU NEED TO BE LOGGED IN TO ACCESS THIS PAGE
      </h1>

      <button
        on:click={() => signIn("google")}
        class="mt-2 px-2 py-1 text-xl font-semibold bg-[#fdfefd] hover:bg-[#24bb49] rounded transform duration-700 ease-in-out"
        >SignUp/SignIn</button
      >
    </div>
  </main>
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
