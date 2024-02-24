import { createStore } from 'vuex';


export default createStore({
  state: {
    depotBestand: 0, // Initialisierung hinzugefügt
    aktuellesGuthaben: 50000, // Startguthaben als Initialwert
    lastSellPrice: 99,
  },
  mutations: {
    aktualisiereAktuellenDepotBestand(state, neuerBestand) {
      state.depotBestand = neuerBestand;
    },
    aktualisiereAktuellesGuthaben(state, betrag) {
      state.aktuellesGuthaben += betrag;
    },
    updateLastSellPrice(state, newPrice) {
      state.lastSellPrice = newPrice;
    },
  },
  actions: {
    aktualisiereDepotBestand({ commit }, neuerBestand) {
      commit('aktualisiereAktuellenDepotBestand', neuerBestand);
    },
    aktualisiereGuthaben({ commit }, betrag) {
      commit('aktualisiereAktuellesGuthaben', betrag);
    },
    updateLastSellPrice({ commit }, newPrice) {
      commit('updateLastSellPrice', newPrice);
    },
  },
});