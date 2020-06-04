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
  let from = "USD";
  let to = "CAD";
  let amt = 0;
  let toAmt = null;

  async function handleSubmit() {
    const res = await fetch(
      `/.netlify/functions/convert?from=${from}&to=${to}&amt=${amt}`
    );
    const { amt: resAmt } = await res.json();
    toAmt = `${amt} ${from} = ${resAmt} ${to}`;
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
  </form>
</main>
{#if toAmt}
  <div class="amt" transition:fade>
    <div>{toAmt}</div>
  </div>
{/if}

<style type="text/scss">
  @use "sass:color";
  $text: color.scale(#0096bfab, $lightness: -30%);
  $width: 380px;
  $border-radius: 6px;
  $background: #fff;

  main {
    text-align: center;
    padding: 1em;
    width: $width;
    margin: 0 auto;
    margin-top: 120px;
    background: $background;
    border-radius: $border-radius;
    box-sizing: border-box;
  }

  h1 {
    color: $text;
    font-weight: 200;
    margin-bottom: 20px;
    font-size: 36px;
    font-weight: 300;
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
    width: 85px;
    margin-right: 0;
  }

  input[type="number"] {
    width: 80px;
    text-align: right;
  }

  .to {
    margin: 0 8px;
  }

  button {
    margin-left: auto;
    margin-right: auto;
    margin-top: 8px;
    width: 310px;
  }

  .amt {
    width: $width;
    box-sizing: border-box;
    border-radius: $border-radius;
    text-align: center;
    margin: 0 auto;
    margin-top: 12px;
    background: $background;
    padding: 12px 0;

    div {
      font-size: 24px;
      color: $text;
      font-weight: 300;
      margin: 0 18px;
    }
  }
</style>
