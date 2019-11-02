<script>
  import * as CrudService from "../services/CrudService";

  const product = { name: "", description: "", price: 0 };
  $: console.log(product.description);
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
</style>

<form on:submit|preventDefault>
  <div class="row-line">
    <div class="half">
      <div class="input-area">
        <label>Nome:</label>
        <input type="text" bind:value={product.name} />
      </div>
    </div>
    <div class="half">
      <div class="input-area">
        <label>Preço:</label>
        <input type="number" bind:value={product.price} />
      </div>
    </div>
  </div>
  <div class="input-area">
    <label>Descrição:</label>
    <textarea bind:value={product.description} />
  </div>

</form>
