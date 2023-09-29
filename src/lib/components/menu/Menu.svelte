<script lang="ts">
  // @ts-ignore
  import FaHome from "svelte-icons/fa/FaHome.svelte";
</script>

<nav
  class="py-2 px-8 flex justify-between text-xl text-[#fdfefd] font-bold bg-[#292929]"
>
  <a
    href="/meditate"
    class="hover:text-[#24bb49] transform duration-700 ease-in-out">Meditate</a
  >
  <a
    href="/"
    class="h-8 hover:text-[#24bb49] transform duration-700 ease-in-out"
    ><FaHome /></a
  >
  <a
    href="/dashboard"
    class="hover:text-[#24bb49] transform duration-700 ease-in-out">Dashboard</a
  >
</nav>
