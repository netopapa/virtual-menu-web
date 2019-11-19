<script>
  import * as CrudService from "../services/CrudService";
  import { createEventDispatcher } from "svelte";

  export let table = { id: 0, number: 0, busy: false };
  const dispatch = createEventDispatcher();
  let mustDisable = true;

  const saveOrUpdate = () => {
    if (!table.id || table.id == 0) {
      CrudService.save("restaurant-tables/", table).then(success => {
        hideForm();
      });
    } else {
      CrudService.update("restaurant-tables/", table).then(success => {
        hideForm();
      });
    }
  };

  const verifyFields = target => {
    mustDisable = !table.number || table.number < 1;
  };

  const hideForm = () => {
    table = { id: 0, number: 0, busy: false };
    dispatch("hide");
  };
</script>

<style>
  .row-line {
    justify-content: space-between;
  }
  .row-line .half {
    padding: 0 10px;
  }
  form .input-area {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: start;
  }
  form .input-area input {
    outline: 0;
    border: none;
    border-bottom: 1px solid #8e8e8e;
  }
  form .input-area textarea {
    outline: 0;
    border: none;
    border-bottom: 1px solid #8e8e8e;
    width: calc(100% - 20px);
    display: block;
    margin: 10px auto;
    height: 25px;
  }

  form .actions {
    margin-top: 25px;
    justify-content: space-around;
  }

  form .actions button {
    padding: 5px 10px;
    text-transform: uppercase;
  }
</style>

<form on:submit|preventDefault={saveOrUpdate}>
  <div class="row-line">
    <div class="input-area">
      <label>Número:</label>
      <input
        type="number"
        bind:value={table.number}
        on:keydown={verifyFields}
        min="1"
        required />
    </div>
  </div>

  <div class="actions row-line">
    <button type="button" class="btn warn" on:click={hideForm}>Cancelar</button>
    <button type="submit" class="btn success" disabled={mustDisable}>
      Salvar
    </button>
  </div>

</form>
