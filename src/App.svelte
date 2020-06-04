<script>
  import { fade } from "svelte/transition";
  import onNumberKeyDown from "./onNumberKeyDown";

  const currencies = ["CAD", "USD", "EUR", "AUD"];
  let from = "CAD";
  let to = "USD";
  let amt = 0;
  let toAmt = 0;

  async function handleSubmit() {
    toAmt = amt ? amt * Math.random() : 0;

    const res = await fetch("/.netlify/functions/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, amt }),
    });
    ({ toAmt } = await res.json());
  }
</script>

<main>
  <h1>Currency Converter</h1>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <input
        type="number"
        bind:value={amt}
        min="0"
        on:keydown={onNumberKeyDown} />
      <select name="from" bind:value={from}>
        {#each currencies.filter(c => c !== to) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>

      <div class="to">to</div>

      <select name="to" bind:value={to}>
        {#each currencies.filter(c => c !== from) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>

    <button type="submit" disabled={!amt}>Convert</button>

    {#if toAmt}
      <div transition:fade>{toAmt}</div>
    {/if}
  </form>
</main>

<style lang="scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;

    @media (min-width: 640px) {
      max-width: none;
    }
  }

  h1 {
    color: darkblue;
    text-transform: uppercase;
    font-weight: 100;
  }

  form > div {
    display: flex;
    justify-content: center;
    align-items: center;

    * {
      margin-bottom: 0;
    }
  }

  select {
    width: 80px;
  }

  input[type="number"],
  select {
    width: 80px;
  }

  .to {
    margin: 0 8px;
  }

  button {
    margin-top: 10px;
    margin-bottom: 16px;
  }
</style>
