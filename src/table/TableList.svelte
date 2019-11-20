<script>
  import { onMount } from "svelte";
  import * as CrudService from "../services/CrudService";
  import Modal from "../components/Modal.svelte";
  import TableForm from "./TableForm.svelte";

  let openModal = false;
  let tableToEdit = {};

  const showForm = () => {
    openModal = true;
  };

  const editItem = (obj, ev) => {
    tableToEdit = obj;
    showForm();
  };

  const removeItem = (id, ev) => {
    CrudService.remove("restaurant-tables/", id).then(() => {
      getTables();
    });
  };

  const createItem = () => {
    tableToEdit = { id: 0, number: 0, busy: false };
    showForm();
  };

  const hideForm = () => {
    openModal = false;
    getTables();
  };

  let tableList = [];

  const getTables = () => {
    CrudService.getAll("restaurant-tables/").then(success => {
      tableList = success;
    });
  };

  onMount(() => {
    getTables();
  });
</script>

<style>
  #table-list {
    width: 60%;
    margin: 30px 0;
  }

  #table-list .table .cell {
    width: 33%;
  }

  #table-list .table .list-content {
    display: contents;
  }
</style>

<Modal open={openModal} on:hide={hideForm}>
  <h3 class="center" slot="title">
    {#if !tableToEdit.id || tableToEdit.id == 0}
      Create Table
    {:else}Edit Table{/if}
  </h3>
  <div slot="content">
    <TableForm on:hide={hideForm} table={tableToEdit} />
  </div>
</Modal>

<section id="table-list" class="card">
  <div class="header space-between">
    <h3>Restaurant Tables ({tableList.length})</h3>
    <button class="btn success" on:click={createItem}>
      <i class="fa fa-plus" />
    </button>
  </div>

  <div class="table">

    <div class="row header" style="display: flex;">
      <div class="cell">Number</div>
      <div class="cell">Status</div>
      <div class="cell">Actions</div>
    </div>

    <div class="list-content">
      {#each tableList as table}
        <!-- content here -->
        <div class="row" style="display: flex;">
          <div class="cell" data-title="name">{table.number}</div>
          <div class="cell" data-title="description">
            {table.busy ? 'Busy' : 'Free'}
          </div>
          <div class="cell" data-title="actions">
            <div class="options">
              <button class="btn info" on:click={editItem.bind(this, table)}>
                <i class="fa fa-pencil" />
              </button>
              <button
                class="btn danger"
                on:click={removeItem.bind(this, table.id)}>
                <i class="fa fa-trash" />
              </button>
            </div>
          </div>
        </div>
      {:else}
        <h5 class="center">No tables yet</h5>
      {/each}
    </div>
  </div>
</section>
