<template>
  <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded">
    <div class="card-body">
      <h3>Geldbeutel</h3>
      <table class="table table-borderless">
        <tbody>
          <tr>
            <td>Startguthaben</td>
            <td></td>
            <td>{{ startGuthaben }} €</td>
          </tr>
          <tr>
            <td>Aktuelles Guthaben</td>
            <td></td>
            <td>{{ guthaben }} €</td>
          </tr>
          <tr>
            <td>Wertentwicklung</td>
            <td></td>
            <td>{{ wertEntwicklung }} €</td>
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
    const depotBestand = computed(() => {
      return Number(store.state.depotBestand) || 0; // Gibt 0 zurück, wenn die Konvertierung NaN ergibt
    });
    const guthaben = computed(() => {
      return Number(store.state.guthaben) || 0; // Gibt 0 zurück, wenn die Konvertierung NaN ergibt
    });

    const wertEntwicklung = computed(() => {
      return guthaben.value - store.state.startGuthaben;
    });

    return {
      depotBestand,
      guthaben,
      wertEntwicklung,
      startGuthaben,
    };
  },
};
</script>

<style>
h3 {
  margin-bottom: 15px;
}
</style>
