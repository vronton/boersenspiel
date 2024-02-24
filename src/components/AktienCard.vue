<template>
    <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded">
        <div class="card-body">
            <h3> Aktie | Mustermann AG</h3>
            <div class="card chart-container">
                <canvas ref="chartRef"></canvas>
            </div>


            <!-- Button trigger modal - Kaufen -->
            <button type="button" class="btn btn-primary rounded-pill" @click="openKaufenModal">
                Kaufen
            </button>

            <!-- Kaufen Modal -->
            <div class="modal fade" ref="kaufenModal" id="kaufenModal" tabindex="-1" aria-labelledby="kaufenModalLabel"
                aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Wie viele Aktien möchtest du kaufen?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <input type="number" class="form-control" id="anzahlAktienKaufen"
                                        v-model.number="anzahlAktien" placeholder="Anzahl" min="1">
                                    <small id="anzahlAktienKaufenHelp" class="form-text text-muted">Gebühren: Orderprovision
                                        4,95 € zzgl.
                                        0,25% | min. 9,99 € max. 59,99 €</small>
                                </div>
                            </form>

                            <h5>Kaufen für</h5>

                            <table class="table table-borderless">
                                <tbody>

                                    <tr>
                                        <td>Kaufpreis</td>
                                        <td></td>
                                        <td>{{ gesamtPreisGeldkurs.toFixed(2) }} €</td>
                                    </tr>

                                    <tr>
                                        <td>Gebühren</td>
                                        <td></td>
                                        <td>- {{ gebuehrenBriefkurs.toFixed(2) }} €</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gesamt</b></td>
                                        <td></td>
                                        <td><b>- {{ gesamtPreisBriefkursInklGebuehren.toFixed(2) }} €</b></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary rounded-pill" @click="handleKaufen">Jetzt
                                kaufen</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ZusammenfassungKaufenModal Modal -->
            <div class="modal fade" ref="zusammenfassungKaufenModal" id="zusammenfassungKaufenModal" tabindex="-1"
                aria-labelledby="zusammenfassungKaufenModallLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Vielen Dank für deinen <b>Kauf</b> !!</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <table class="table table-borderless">
                                <tbody>

                                    <tr>
                                        <td>Anzahl gekaufter Aktien</td>
                                        <td></td>
                                        <td>+ {{ anzahlAktienZumZeitpunkt }} Stück</td>
                                    </tr>

                                    <tr>
                                        <td>Gebühren</td>
                                        <td></td>
                                        <td>- {{ gebührenKaufenZumZeitpunkt.toFixed(2) }} €</td>
                                    </tr>

                                    <tr>
                                        <td>Gezahlter Betrag (inklusive Gebühren)</td>
                                        <td></td>
                                        <td>- {{ kaufPreisZumZeitpunkt.toFixed(2) }} €
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>aktuelles Guthaben</td>
                                        <td></td>
                                        <td> {{ aktuellesGuthaben.toFixed(2) }} €</td>
                                    </tr>

                                    <tr>
                                        <td>aktueller Depotbestand</td>
                                        <td></td>
                                        <td> {{ depotBestand }} Stück</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark rounded-pill" @click="closeModals">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- Button trigger modal - Verkaufen -->
            <button type="button" class="btn btn-secondary rounded-pill" @click="openVerkaufenModal">
                Verkaufen
            </button>

            <!-- Modal -->
            <div class="modal fade" ref="verkaufenModal" id="verkaufenModal" tabindex="-1"
                aria-labelledby="verkaufenModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Wie viele Aktien möchtest du verkaufen?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <input type="number" class="form-control" id="anzahlAktienVerkaufen"
                                        v-model.number="anzahlAktien" placeholder="Anzahl" min="1">
                                    <small id="anzahlAktienVerkaufenHelp" class="form-text text-muted">Verfügbare Anzahl an
                                        Aktien: {{ depotBestand }} Stück <br>
                                        Gebühren: Orderprovision 4,95 € zzgl. 0,25 % | min. 9,99 € max. 59,99 €</small>
                                </div>
                            </form>


                            <h5>Verkaufen für</h5>

                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>Verkaufen für (Stückpreis)</td>
                                        <td></td>
                                        <td>{{ lastSellPrice.toFixed(2) }} €</td>
                                    </tr>
                                    <tr>
                                        <td>Gebühren</td>
                                        <td></td>
                                        <td>- {{ gebuehren.toFixed(2) }} € </td>
                                    </tr>

                                    <tr>
                                        <td><b>Gesamt</b></td>
                                        <td></td>
                                        <td><b>+ {{ gesamtPreisInklGebuehren.toFixed(2) }} €</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary rounded-pill" @click="handleVerkaufen">Jetzt
                                verkaufen</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ZusammenfassungVerkaufenModal Modal -->
            <div class="modal fade" ref="zusammenfassungVerkaufenModal" id="zusammenfassungVerkaufenModal" tabindex="-1"
                aria-labelledby="zusammenfassungKaufenModallLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Vielen Dank für deinen <b>Verkauf</b>!! </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <table class="table table-borderless">
                                <tbody>

                                    <tr>
                                        <td>Anzahl vekaufter Aktien</td>
                                        <td></td>
                                        <td>- {{ anzahlAktienZumZeitpunkt }} Stück</td>
                                    </tr>

                                    <tr>
                                        <td>Gebühren</td>
                                        <td></td>
                                        <td>- {{ gebührenVerkaufenZumZeitpunkt.toFixed(2) }} €</td>
                                    </tr>

                                    <tr>
                                        <td>Ausgezahlter Betrag (inklusive Gebühren)</td>
                                        <td></td>
                                        <td>+ {{ verkaufPreisZumZeitpunkt.toFixed(2) }} €
                                        </td>
                                    </tr>
                                    <tr>

                                    </tr>

                                    <tr>
                                        <td>aktuelles Guthaben</td>
                                        <td></td>
                                        <td> {{ aktuellesGuthaben.toFixed(2) }} €</td>
                                    </tr>

                                    <tr>
                                        <td>aktueller Depotbestand</td>
                                        <td></td>
                                        <td> {{ depotBestand }} Stück</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark rounded-pill"
                                @click="closeVerkaufenModals">Schließen</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import * as bootstrap from 'bootstrap';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useStore } from 'vuex';



export default {
    name: 'AktienCard',
    setup() {
        // Reaktive Referenzen
        const kaufenModal = ref(null);
        const verkaufenModal = ref(null);
        const zusammenfassungKaufenModal = ref(null);
        const zusammenfassungVerkaufenModal = ref(null);
        const store = useStore(); // Vuex Store instanzieren
        const depotBestand = ref(0);
        const aktuellesGuthaben = ref(50000);


        const lastBuyPrice = ref(100); // Startpreis
        const lastSellPrice = ref(99); // Startpreis


        const chartRef = ref(null);
        const anzahlAktien = ref(0);
        // Berechnet den Gesamtpreis basierend auf dem aktuellen Preis und der Anzahl der Aktien
        const gesamtPreisBriefkurs = computed(() => anzahlAktien.value * lastBuyPrice.value);
        const gesamtPreisGeldkurs = computed(() => anzahlAktien.value * lastSellPrice.value);
        const kaufPreisZumZeitpunkt = ref(0);
        const verkaufPreisZumZeitpunkt = ref(0);
        const gebührenVerkaufenZumZeitpunkt = ref(0);
        const gebührenKaufenZumZeitpunkt = ref(0);
        const anzahlAktienZumZeitpunkt = ref(0);

        let trendCounter = { buy: 0, sell: 0 }; // Zählt, wie oft der Preis in Folge gestiegen oder gefallen ist
        let marketCondition = 'neutral'; // 'bull', 'bear', 'neutral'
        let lineChart;


        const openKaufenModal = () => {
            new bootstrap.Modal(kaufenModal.value).show();
        };

        const openVerkaufenModal = () => {
            new bootstrap.Modal(verkaufenModal.value).show();
        };



        const gebuehren = computed(() => {
            const provision = 4.95 + gesamtPreisGeldkurs.value * 0.0025;
            return Math.max(9.99, Math.min(59.99, provision));
        });

        const gebuehrenBriefkurs = computed(() => {
            const provision = 4.95 + gesamtPreisBriefkurs.value * 0.0025;
            return Math.max(9.99, Math.min(59.99, provision));
        });


        const validierteAnzahlAktien = computed({
            get: () => anzahlAktien.value,
            set: (newValue) => {
                if (newValue >= 0 && Number.isInteger(newValue)) {
                    anzahlAktien.value = newValue;
                } else {
                    anzahlAktien.value = Math.max(0, Math.round(newValue));
                }
            },
        });

        const gesamtPreisInklGebuehren = computed(() => gesamtPreisGeldkurs.value - gebuehren.value);
        const gesamtPreisBriefkursInklGebuehren = computed(() => gesamtPreisBriefkurs.value + gebuehrenBriefkurs.value);

        const handleKaufen = () => {
            if (anzahlAktien.value > 0) {
                const kosten = gesamtPreisBriefkurs.value + gebuehrenBriefkurs.value;
                if (aktuellesGuthaben.value >= kosten) {
                    depotBestand.value += parseInt(anzahlAktien.value, 10);
                    aktuellesGuthaben.value -= kosten;

                    anzahlAktienZumZeitpunkt.value = anzahlAktien.value;
                    gebührenKaufenZumZeitpunkt.value = gebuehrenBriefkurs.value;
                    kaufPreisZumZeitpunkt.value = gesamtPreisBriefkurs.value + gebuehrenBriefkurs.value;


                    store.dispatch('aktualisiereDepotBestand', depotBestand.value);
                    store.dispatch('aktualisiereGuthaben', -kosten);

                    openZusammenfassungKaufenModal();
                } else {
                    alert("Nicht genug Guthaben für den Kauf.");
                }
            } else {
                alert("Bitte geben Sie eine gültige Anzahl von Aktien ein.");
            }
        };

        const handleVerkaufen = () => {
            // Stelle sicher, dass anzahlAktien und depotBestand korrekt verglichen werden
            if (anzahlAktien.value > 0 && anzahlAktien.value <= depotBestand.value) {
                const erloes = gesamtPreisGeldkurs.value - gebuehren.value;
                depotBestand.value -= parseInt(anzahlAktien.value, 10);
                aktuellesGuthaben.value += erloes;

                anzahlAktienZumZeitpunkt.value = anzahlAktien.value;
                verkaufPreisZumZeitpunkt.value = gesamtPreisGeldkurs.value - gebuehren.value;
                gebührenVerkaufenZumZeitpunkt.value = gebuehren.value;

                // Aktualisiere den Store mit den neuen Werten
                store.dispatch('aktualisiereDepotBestand', depotBestand.value);
                store.dispatch('aktualisiereGuthaben', erloes);

                // Öffne das Modal für die Zusammenfassung des Verkaufs
                openZusammenfassungVerkaufenModal();

            } else if (anzahlAktien.value > depotBestand.value) {
                // Benachrichtige den Benutzer, wenn versucht wird, mehr Aktien zu verkaufen als vorhanden
                alert("Sie haben nicht so viele Aktien im Depot.");
            } else {
                // Benachrichtige den Benutzer, wenn eine ungültige Anzahl von Aktien eingegeben wurde
                alert("Bitte geben Sie eine gültige Anzahl von Aktien ein.");
            }
        };


        const openZusammenfassungKaufenModal = () => {
            // Öffnen des Zusammenfassung-Kaufen-Modals
            const zusammenfassungModalInstance = new bootstrap.Modal(zusammenfassungKaufenModal.value);
            zusammenfassungModalInstance.show();

            // Schließen des Kaufen-Modals
            const kaufenModalInstance = bootstrap.Modal.getInstance(kaufenModal.value);
            kaufenModalInstance.hide();
        };



        const openZusammenfassungVerkaufenModal = () => {
            // Öffnen des Zusammenfassung-Kaufen-Modals
            const zusammenfassungVerkaufenModalInstance = new bootstrap.Modal(zusammenfassungVerkaufenModal.value);
            zusammenfassungVerkaufenModalInstance.show();

            // Schließen des Verkaufen-Modals
            const verkaufenModalInstance = bootstrap.Modal.getInstance(verkaufenModal.value);
            verkaufenModalInstance.hide();
        };


        const closeModals = () => {

            // Schließen des Zusammenfassung-Kaufen-Modals
            const zusammenfassungKaufenModalInstance = bootstrap.Modal.getInstance(zusammenfassungKaufenModal.value);
            zusammenfassungKaufenModalInstance.hide();
        };

        const closeVerkaufenModals = () => {

            // Schließen des Zusammenfassung-Kaufen-Modals
            const zusammenfassungVerkaufenModalInstance = bootstrap.Modal.getInstance(zusammenfassungVerkaufenModal.value);
            zusammenfassungVerkaufenModalInstance.hide();
        };



        const adjustProbabilityAndTrend = (change, trend) => {
            if (change > 0) {
                trend += 1;
            } else if (change < 0) {
                trend -= 1;
            }
            // Prüfe auf Bullen- oder Bärenmarktbedingungen
            if (trend >= 3) {
                marketCondition = 'bull';
            } else if (trend <= -3) {
                marketCondition = 'bear';
            } else {
                marketCondition = 'neutral';
            }
            return trend;
        };

        const getRandomPriceChange = () => {
            const baseChange = Math.random() * (0.05 - 0.01) + 0.01;
            // Passt die Wahrscheinlichkeit basierend auf dem Markt an
            const direction = Math.random() < (marketCondition === 'bull' || marketCondition === 'bear' ? 0.75 : 0.5) ? 1 : -1;
            return baseChange * direction;
        };

        const addDataPoint = () => {
            const buyPriceChange = getRandomPriceChange();
            const sellPriceChange = getRandomPriceChange();

            // Anpassen der Trends
            trendCounter.buy = adjustProbabilityAndTrend(buyPriceChange, trendCounter.buy);
            trendCounter.sell = adjustProbabilityAndTrend(sellPriceChange, trendCounter.sell);

            // Korrekte Verwendung von .value zum Aktualisieren der Werte
            lastBuyPrice.value += buyPriceChange;
            lastSellPrice.value += sellPriceChange;
            handlePriceUpdate(lastSellPrice.value);

            // Aktualisiere den Chart mit den neuen Datenpunkten
            lineChart.data.datasets[0].data.push({ x: new Date(), y: lastBuyPrice.value });
            lineChart.data.datasets[1].data.push({ x: new Date(), y: lastSellPrice.value });

            lineChart.update();

        };

        const handlePriceUpdate = (newSellPrice) => {
            store.dispatch('updateLastSellPrice', newSellPrice);
            lastSellPrice.value = newSellPrice; // Aktualisiere auch den lokalen Zustand, falls notwendig
        };

        onMounted(() => {
            const ctx = chartRef.value.getContext('2d');
            lineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Briefkurs in €',
                        // Startwert wird als erster Datenpunkt hinzugefügt
                        data: [{ x: new Date(), y: lastBuyPrice.value }],
                        borderColor: 'rgba(0, 200, 0, 1)',
                        borderWidth: 2
                    }, {
                        label: 'Geldkurs in €',
                        // Startwert wird als erster Datenpunkt hinzugefügt
                        data: [{ x: new Date(), y: lastSellPrice.value }],
                        borderColor: 'rgba(0, 0, 200, 1)',
                        borderWidth: 2
                    }],
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'second',
                                displayFormats: {
                                    second: 'HH:mm:ss'
                                }
                            },
                            title: {
                                display: true,
                                text: 'Uhrzeit'
                            },
                        },
                        y: {
                            beginAtZero: false,
                            title: {
                                display: true,
                                text: 'Wert in €'
                            },
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    responsive: true,
                    maintainAspectRatio: false
                }
            });

            setInterval(addDataPoint, 1000); // Fügt jede Sekunde einen neuen Datenpunkt hinzu
        });

        return {
            kaufenModal,
            verkaufenModal,
            zusammenfassungKaufenModal,
            zusammenfassungVerkaufenModal,
            anzahlAktien,
            gesamtPreisGeldkurs,
            gesamtPreisBriefkurs,
            gebuehren,
            gebuehrenBriefkurs,
            gesamtPreisInklGebuehren,
            gesamtPreisBriefkursInklGebuehren,
            validierteAnzahlAktien,
            anzahlAktienZumZeitpunkt,
            kaufPreisZumZeitpunkt,
            verkaufPreisZumZeitpunkt,
            gebührenVerkaufenZumZeitpunkt,
            gebührenKaufenZumZeitpunkt,
            aktuellesGuthaben,
            handleKaufen,
            handleVerkaufen,
            openKaufenModal,
            openVerkaufenModal,
            openZusammenfassungKaufenModal,
            openZusammenfassungVerkaufenModal,
            closeModals,
            closeVerkaufenModals,
            chartRef,
            lastBuyPrice,
            lastSellPrice,
            depotBestand,

        };
    }
};
</script>

<style>
form {
    margin-bottom: 30px;
    margin-top: 15px;
}


h5 {
    margin-top: 100px;
}
</style>