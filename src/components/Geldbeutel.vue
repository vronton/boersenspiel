<template>
  <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded">
    <div class="card-body">
      <h3>Übersicht</h3>
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>Startguthaben</td>
            <td></td>
            <td>{{ startGuthaben.toFixed(2) }} €</td>
          </tr>
          <tr>
            <td>Aktuelles Guthaben</td>
            <td></td>
            <td>{{ aktuellesGuthaben.toFixed(2)}} €</td>
          </tr>
          <tr>
            <td>Wertentwicklung</td>
            <td></td>
            <td>{{ wertEntwicklung.toFixed(2) }} €</td>
          </tr>
          <tr>
            <td>Depotbestand</td>
            <td></td>
            <td>{{ depotBestand }} Aktien</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'GeldBeutel',
  setup() {
    const store = useStore();

    const startGuthaben = 50000;
    const depotBestand = computed(() => store.state.depotBestand);
    const aktuellesGuthaben = computed(() => store.state.aktuellesGuthaben);
    const aktuellerAktienWert = computed(() => store.state.aktuellerAktienWert);
    const lastSellPrice = computed(() => store.state.lastSellPrice);

    const wertEntwicklung = computed(() => {
      return (aktuellesGuthaben.value + (depotBestand.value * lastSellPrice.value))- startGuthaben;
    });

    return {
      depotBestand,
      aktuellesGuthaben,
      wertEntwicklung,
      startGuthaben,
      aktuellerAktienWert,
      lastSellPrice,
    };
  },
};
</script>

<style>
h3 {
  margin-bottom: 15px;
}
</style>
