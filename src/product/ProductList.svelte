<script>
  import * as CrudService from "../services/CrudService";
  import Modal from "../components/Modal.svelte";

  let openModal = false;

  const showForm = () => {
    openModal = true;
  };

  const hideForm = () => {
    openModal = false;
  };
</script>

<style>
  #product-list {
    width: 60%;
    margin: 30px 0;
  }

  #product-list .table .cell {
    width: 33%;
  }
</style>

<Modal open={openModal} on:hide={hideForm}>
  <h3 class="center" slot="title">Título</h3>
  <div slot="content">
    <h2>asijaisojoias</h2>
  </div>
</Modal>


<section id="product-list" class="card">
  <div class="header space-between">
    <h3>Produtos (1)</h3>
    <button class="btn success" on:click={showForm}>
      <i class="fa fa-plus" />
    </button>
  </div>

  <div class="table">

    <div class="row header">
      <div class="cell">Number</div>
      <div class="cell">Status</div>
      <div class="cell">Actions</div>
    </div>

    <div class="row">
      <div class="cell" data-title="Full Name">1</div>
      <div class="cell" data-title="Age">Busy</div>
      <div class="cell" data-title="Job Title">
        <div class="options">
          <button class="btn info">
            <i class="fa fa-pencil" />
          </button>
          <button class="btn danger">
            <i class="fa fa-trash" />
          </button>
        </div>
      </div>
    </div>

  </div>

  <!-- <ul>
    <li class="space-between">
      <sub>Hamburguer</sub>
      <div class="options">
        <button class="btn info">
          <i class="fa fa-pencil" />
        </button>
        <button class="btn danger">
          <i class="fa fa-trash" />
        </button>
      </div>
    </li>
  </ul> -->
</section>
