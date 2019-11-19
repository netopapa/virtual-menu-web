<script>
  import { createEventDispatcher } from "svelte";

  export let wishList = [];
  export let total = 0;
  const dispatch = createEventDispatcher();

  const hideCart = () => {
    dispatch("hide");
  };
</script>

<style>
  button {
    display: block;
    margin: 0 auto;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
  }
</style>

<section id="cart">
  <ul>
    {#each wishList as item}
      <li>
        <span>{item.name}</span>
        <span>R${item.price}</span>
      </li>
    {/each}
    <hr>
    <li>
      <span>Total</span>
      <span>R${total}</span>
    </li>
  </ul>

  <button class="btn warn" on:click={hideCart}>Back</button>
</section>
