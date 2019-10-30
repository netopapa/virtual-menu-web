<script>
  import { createEventDispatcher } from "svelte";

  export let open = false;
  const dispatch = createEventDispatcher();

  const hideForm = () => {
    dispatch("hide");
  };
</script>

<style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    opacity: 0;
    z-index: -9;
    transition: 0.3s linear;
  }
  .modal.open {
    opacity: 1;
    z-index: 99;
  }

  .pelicula {
    background-color: rgba(0, 0, 0, 0.75);
    height: 100%;
    width: 100%;
  }
  .card {
    position: relative;
    color: black;
    border: 1px solid white;
    border-radius: 5px;
    padding: 20px 30px;
    background-color: white;
    box-shadow: -5px 4px 13px -2px rgba(0, 0, 0, 0.75);
  }
  .card-header {
    padding-bottom: 15px;
    border-bottom: 1px solid #e8e8e8;
  }
  .card-header div:nth-child(1) {
    padding-bottom: 10px;
    font-weight: 600;
  }
  .card-header div:nth-child(2) {
    font-size: 0.9rem;
    color: gray;
  }
  .card-content {
    padding: 15px;
    padding-bottom: 0;
  }

  .btn-close {
    background-color: transparent;
    outline: 0;
    padding: 10px;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    cursor: pointer;
  }
</style>

<div class={open ? 'modal open' : 'modal'}>
  <div class="pelicula centralizado">
    <div class="card">
      <div class="card-header">
        <button on:click={hideForm} class="btn-close">
          <i class="fa fa-close"></i>
        </button>
        <slot name="title" />
      </div>
      <div class="card-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</div>
