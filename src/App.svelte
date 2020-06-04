<script>
  import { fade } from "svelte/transition";
  import onNumberKeyDown from "./onNumberKeyDown";

  const currencies = [
    "CAD",
    "USD",
    "EUR",
    "AUD",
    "HKD",
    "JPY",
    "GBP",
    "INR",
    "RUB",
    "CNY",
    "NZD",
    "MXN",
    "SGD",
    "KRW",
    "ILS",
  ].sort();
  let from = "CAD";
  let to = "USD";
  let amt = 0;
  let toAmt = null;

  async function handleSubmit() {
    const res = await fetch(
      `/.netlify/functions/convert?from=${from}&to=${to}&amt=${amt}`
    );
    ({ amt: toAmt } = await res.json());
  }

  function resetAmt() {
    toAmt = null;
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
        step="any"
        on:keydown={onNumberKeyDown}
        on:input={resetAmt} />
      <select name="from" bind:value={from} on:input={resetAmt}>
        {#each currencies.filter(c => c !== to) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>

      <div class="to">to</div>

      <select name="to" bind:value={to} on:input={resetAmt}>
        {#each currencies.filter(c => c !== from) as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>

    <button type="submit" disabled={!amt}>Convert</button>

    {#if toAmt}
      <div class="amt" transition:fade>{toAmt}</div>
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

  .amt {
    font-size: 24px;
    color: darkblue;
  }
</style>
