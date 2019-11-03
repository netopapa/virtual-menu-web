<script>
  import * as CrudService from "../services/CrudService";
  import { createEventDispatcher } from "svelte";

  export let product = { id: 0, name: "", description: "", price: 0 };
  const dispatch = createEventDispatcher();
  let mustDisable = true;

  const saveOrUpdate = () => {
    if (!product.id || product.id == 0) {
      CrudService.save("products/", product).then(success => {
        hideForm();
      });
    } else {
      CrudService.update("products/", product).then(success => {
        hideForm();
      });
    }
  };

  const verifyFields = target => {
    mustDisable =
      !product.name ||
      product.name.length < 1 ||
      !product.description ||
      product.description.length < 1 ||
      !product.price ||
      product.price < 0.1;
  };

  const hideForm = () => {
    product = { id: 0, name: "", description: "", price: 0 };
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
    <div class="half">
      <div class="input-area">
        <label>Nome:</label>
        <input
          type="text"
          bind:value={product.name}
          on:keydown={verifyFields}
          required />
      </div>
    </div>
    <div class="half">
      <div class="input-area">
        <label>Preço:</label>
        <input
          type="number"
          bind:value={product.price}
          on:keydown={verifyFields}
          required />
      </div>
    </div>
  </div>
  <div class="input-area">
    <label>Descrição:</label>
    <textarea
      bind:value={product.description}
      on:keydown={verifyFields}
      required />
  </div>

  <div class="actions row-line">
    <button type="button" class="btn warn" on:click={hideForm}>Cancelar</button>
    <button type="submit" class="btn success" disabled={mustDisable}>
      Salvar
    </button>
  </div>

</form>
