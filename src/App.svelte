<script>
  import Header from "./components/Header.svelte";
  import TableList from "./table/TableList.svelte";
  import ProductList from "./product/ProductList.svelte";
</script>

<style>
  #dashboard {
    height: calc(100vh - 100px);
  }
</style>

<Header />

<section id="dashboard" class="centralizado">
    <ProductList />
  <!-- <div class="row-line"> -->
    <!-- <div class="half centralizado">
      
    </div>
    <div class="half centralizado" />
  </div> -->

  <!-- <div class="row-line">
    <div class="half">cooking requests container</div>
    <div class="half">shopping carts container</div>
  </div> -->
</section>
