<script>
  import { onMount } from "svelte";
  import Cart from "./Cart.svelte";
  import * as CrudService from "../services/CrudService";
  import Modal from "../components/Modal.svelte";

  let openModal = false;
  let wishList = [];
  let total = 0;

  const showCart = () => {
    openModal = true;
  };

  const hideCart = () => {
    openModal = false;
  };

  const addToCart = (obj, ev) => {
    wishList = [...wishList, obj];
    total = total + obj.price;
  };

  let productList = [];

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
  .row {
    display: flex;
  }

  #cardapio {
    position: relative;
  }

  #cardapio .table .cell {
    width: 33%;
  }

  #cardapio .table .list-content {
    display: contents;
  }

  .header-c {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .header-c .title{
      margin-left: 5px;
  }
</style>

<Modal open={openModal} on:hide={hideCart}>
  <h3 class="center" slot="title">Meus Pedidos</h3>
  <div slot="content">
    <Cart on:hide={hideCart} wishList={wishList} total={total}/>
  </div>
</Modal>

<section id="cardapio">
  <div class="header-c">
    <h2 class="title">Cardápio</h2>
    <button on:click={showCart} class="btn success">Pedidos</button>
  </div>

  <div class="table">

    <div class="row header">
      <div class="cell">Name</div>
      <div class="cell">Price</div>
      <div class="cell">Actions</div>
    </div>

    <div class="list-content">
      {#each productList as product}
        <!-- content here -->
        <div class="row">
          <div class="cell" data-title="name">{product.name}</div>
          <div class="cell" data-title="price">R${product.price}</div>
          <div class="cell" data-title="actions">
            <div class="options">
              <button class="btn info" on:click={addToCart.bind(this, product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      {:else}
        <h5 class="center">No products yet</h5>
      {/each}
    </div>
  </div>
</section>
