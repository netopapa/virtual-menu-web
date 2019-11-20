<script>
  import { onMount } from "svelte";
  import * as CrudService from "../services/CrudService";

  let productList = [];

  const doFood = (obj, ev) => {
    obj.ready = true;

    productList = productList.filter(item => {
      return item.id === obj.id ? false : true;
    });

    productList = [...productList, obj];
  };

  const getProducts = () => {
    CrudService.getAll("products/").then(success => {
      productList = success;
    });
  };

  onMount(() => {
    getProducts();
  });
</script>

<style>
  #cooking-list {
    width: 60%;
    margin: 30px 0;
  }

  #cooking-list .table .cell {
    width: 33%;
  }

  #cooking-list .table .list-content {
    display: contents;
  }
</style>

<section id="cooking-list" class="card">
  <div class="header space-between">
    <h3>Cooking Requests ({productList.length})</h3>
  </div>

  <div class="table">

    <div class="row header" style="display: flex;">
      <div class="cell">Name</div>
      <div class="cell">Description</div>
      <div class="cell">Actions</div>
    </div>

    <div class="list-content">
      {#each productList as product}
        <!-- content here -->
        <div class="row" style="display: flex;">
          <div class="cell" data-title="name">{product.name}</div>
          <div class="cell" data-title="description">{product.description}</div>
          <div class="cell" data-title="actions">
            <div class="options">
              {#if product.ready}
                <span>OK</span>
              {:else}
                <button class="btn info" on:click={doFood.bind(this, product)}>
                  is ready
                </button>
              {/if}
            </div>
          </div>
        </div>
      {:else}
        <h5 class="center">No requests yet</h5>
      {/each}
    </div>
  </div>

</section>
