import { createStore } from 'vuex';


export default createStore({
  state: {
    anzahlAktienZumZeitpunkt: 0,
    kaufPreisZumZeitpunkt: 0,
  },
  actions: {
    aktualisiereAnzahlAktienImGeldbeutel({ commit }, anzahl) {
        commit('SET_DEPOTBESTAND', anzahl);
    },
    aktualisiereGuthaben({ commit }, betrag) {
        commit('UPDATE_GUTHABEN', betrag);
    },
},
mutations: {
    SET_DEPOTBESTAND(state, anzahl) {

        const numerischeAnzahl = Number(anzahl);
    if (!isNaN(numerischeAnzahl)) {
      state.depotBestand += numerischeAnzahl;
    }
    },
    UPDATE_GUTHABEN(state, betrag) {

        const numerischerBetrag = Number(betrag);
    if (!isNaN(numerischerBetrag)) {
      state.guthaben += numerischerBetrag;
    }
    },
}
});