<script>
  import Header from "./components/Header.svelte";
  import TableList from "./table/TableList.svelte";
  import ProductList from "./product/ProductList.svelte";

  let page = "product";

  function toPage(pageName) {
    page = pageName;
  }
</script>

<style>
  #dashboard {
    height: 100vh;
    display: flex;
  }

  #dashboard nav {
    height: 100%;
    padding: 10px 5px;
    width: 120px;
  }

  #dashboard nav a {
    display: block;
    text-align: center;
    border: 2px solid #6b79e0;
    border-radius: 2px;
    margin-top: 10px;
    transition: 0.3s linear;
  }

  #dashboard nav a.active {
    background-color: #6b79e0;
    color: #ffffff !important;
  }

  #dashboard .main-content {
    position: relative;
    height: 100%;
    width: calc(100% - 120px);
    background-color: rgba(107, 121, 224, 0.15);
  }

  #dashboard .main-content h4 {
    position: absolute;
    top: 5px;
    left: calc(50% - 60px);
  }
</style>

<section id="dashboard">
  <nav id="sidebar">
    <a
      href="javascript:void(0)"
      class:active={page === 'product'}
      on:click={() => {
        toPage('product');
      }}>
      Products
    </a>
    <a
      href="javascript:void(0)"
      class:active={page === 'table'}
      on:click={() => {
        toPage('table');
      }}>
      Tables
    </a>
  </nav>

  <div class="main-content centralizado">
    <h4 class="center">VIRTUAL MENU</h4>
    {#if page === 'product'}
      <ProductList />
    {:else}
      <TableList />
    {/if}
  </div>
</section>
