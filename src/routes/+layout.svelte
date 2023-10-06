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
  <div class="bg-[#fdfefd] overflow-hidden pattern6">
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
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1133%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(36%2c 187%2c 73%2c 1)'%3e%3c/rect%3e%3cpath d='M0%2c637.747C116.961%2c628.346%2c192.846%2c516.303%2c285.728%2c444.601C369.831%2c379.676%2c460.731%2c325.851%2c519.063%2c237.048C584.372%2c137.622%2c646.761%2c26.901%2c638.029%2c-91.735C629.089%2c-213.184%2c568.097%2c-334.386%2c471.539%2c-408.591C380.183%2c-478.798%2c249.392%2c-440.461%2c139.443%2c-474.901C26.532%2c-510.269%2c-66.467%2c-646.34%2c-179.888%2c-612.643C-293.391%2c-578.922%2c-288.975%2c-406.696%2c-372.528%2c-322.798C-465.939%2c-229.001%2c-670.002%2c-230.05%2c-691.058%2c-99.359C-711.979%2c30.496%2c-528.494%2c98.075%2c-458.251%2c209.276C-400.646%2c300.47%2c-395.644%2c419.369%2c-316.856%2c493.037C-230.289%2c573.978%2c-118.132%2c647.243%2c0%2c637.747' fill='%231e9b3d'%3e%3c/path%3e%3cpath d='M1440 1033.763C1526.821 1022.7090000000001 1594.125 961.694 1668.397 915.392 1743.8220000000001 868.371 1832.467 836.268 1878.6309999999999 760.316 1927.158 680.476 1949.216 580.728 1926.961 489.986 1905.387 402.02099999999996 1818.038 352.19399999999996 1761.234 281.649 1701.757 207.78300000000002 1671.073 105.75200000000001 1585.188 65.53399999999999 1495.474 23.522000000000048 1381.9279999999999 17.177999999999997 1294.028 62.863999999999976 1208.772 107.17599999999999 1197.017 222.471 1137.743 298.093 1082.524 368.54200000000003 985.48 405.404 958.611 490.78700000000003 930.398 580.44 953.2660000000001 678.977 990.761 765.1610000000001 1028.683 852.326 1089.311 929.951 1170.897 978.732 1251.104 1026.688 1347.298 1045.566 1440 1033.763' fill='%232ed758'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1133'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
  }
</style>
