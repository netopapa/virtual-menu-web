<script>
  import { onMount } from "svelte";
  import * as CrudService from "../services/CrudService";
  import Modal from "../components/Modal.svelte";
  import ProductForm from "./ProductForm.svelte";

  let openModal = false;
  let productToEdit = {};

  const showForm = () => {
    openModal = true;
  };

  const editItem = (obj, ev) => {
    productToEdit = obj;
    showForm();
  };

  const removeItem = (id, ev) => {
    CrudService.remove("products/", id).then(() => {
      getProducts();
    });
  };

  const createItem = () => {
    productToEdit = { id: 0, name: "", description: "", price: 0 };
    showForm();
  };

  const hideForm = () => {
    openModal = false;
    getProducts();
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
  #product-list {
    width: 60%;
    margin: 30px 0;
  }

  #product-list .table .cell {
    width: 33%;
  }

  #product-list .table .list-content {
    display: contents;
  }
</style>

<Modal open={openModal} on:hide={hideForm}>
  <h3 class="center" slot="title">
    {#if !productToEdit.id || productToEdit.id == 0}
      Create Product
    {:else}Edit Product{/if}
  </h3>
  <div slot="content">
    <ProductForm on:hide={hideForm} product={productToEdit} />
  </div>
</Modal>

<section id="product-list" class="card">
  <div class="header space-between">
    <h3>Produtos ({productList.length})</h3>
    <button class="btn success" on:click={createItem}>
      <i class="fa fa-plus" />
    </button>
  </div>

  <div class="table">

    <div class="row header">
      <div class="cell">Name</div>
      <div class="cell">Description</div>
      <div class="cell">Price</div>
      <div class="cell">Actions</div>
    </div>

    <div class="list-content">
      {#each productList as product}
        <!-- content here -->
        <div class="row">
          <div class="cell" data-title="name">{product.name}</div>
          <div class="cell" data-title="description">{product.description}</div>
          <div class="cell" data-title="price">R${product.price}</div>
          <div class="cell" data-title="actions">
            <div class="options">
              <button class="btn info" on:click={editItem.bind(this, product)}>
                <i class="fa fa-pencil" />
              </button>
              <button
                class="btn danger"
                on:click={removeItem.bind(this, product.id)}>
                <i class="fa fa-trash" />
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
