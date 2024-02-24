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
                                        <td>{{ gebuehren.toFixed(2) }} €</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gesamt</b></td>
                                        <td></td>
                                        <td><b>-{{ gesamtPreisInklGebuehren.toFixed(2) }} €</b></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary rounded-pill"
                                @click="openZusammenfassungKaufenModal">Jetzt kaufen</button>
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
                            <h5 class="modal-title">Vielen Dank für deinen Kauf!!</h5>
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
                                        <td>{{ gekaufteAnzahlAktien }} Stück</td>
                                    </tr>

                                    <tr>
                                        <td>Gezahlter Betrag (inklusive Gebühren)</td>
                                        <td></td>
                                        <td>{{ gebuehren.toFixed(2) }} €</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-dark rounded-pill"
                                @click="openZusammenfassungKaufenModal">Schließen</button>
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
                                        Aktien: 12 <br>
                                        Gebühren: Orderprovision 4,95 € zzgl. 0,25 % | min. 9,99 € max. 59,99 €</small>
                                </div>
                            </form>

                            <h5> Geldbeutel</h5>
                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>Startguthaben</td>
                                        <td></td>
                                        <td>50.000 €</td>
                                    </tr>
                                    <tr>
                                        <td>Aktuelles Guthaben</td>
                                        <td></td>
                                        <td>50.000 €</td>
                                    </tr>
                                    <tr>
                                        <td><b>Wertnetwicklung</b></td>
                                        <td></td>
                                        <td><b>+5.000 €</b></td>
                                    </tr>
                                </tbody>
                            </table>

                            <br>

                            <h5>Verkaufen für</h5>

                            <table class="table table-borderless">
                                <tbody>
                                    <tr>
                                        <td>Stückpreis</td>
                                        <td></td>
                                        <td>{{ lastSellPrice.toFixed(2) }} €</td>
                                    </tr>
                                    <tr>
                                        <td><b>Gesamt</b></td>
                                        <td></td>
                                        <td><b>{{ gesamtPreisBriefkurs.toFixed(2) }} €</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary rounded-pill">Jetzt verkaufen</button>
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


export default {
    name: 'AktienCard',
    setup() {
        // Reaktive Referenzen
        const kaufenModal = ref(null);
        const verkaufenModal = ref(null);
        const zusammenfassungKaufenModal = ref(null);

        const lastBuyPrice = ref(100); // Startpreis
        const lastSellPrice = ref(99); // Startpreis
        const chartRef = ref(null);
        const anzahlAktien = ref(0);
        // Berechnet den Gesamtpreis basierend auf dem aktuellen Preis und der Anzahl der Aktien
        const gesamtPreisBriefkurs = computed(() => anzahlAktien.value * lastSellPrice.value);
        const gesamtPreisGeldkurs = computed(() => anzahlAktien.value * lastBuyPrice.value);
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

        // Berechnete Eigenschaft, die die Anzahl der Aktien überwacht und korrigiert
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

        const gesamtPreisInklGebuehren = computed(() => gesamtPreisGeldkurs.value + gebuehren.value);

        const handleKaufen = () => {
            // Logik zum Hinzufügen der gekauften Aktien zum Depot und Aktualisierung des Guthabens könnte hier implementiert werden
            console.log(`Gekauft: ${anzahlAktien.value} Aktien zum Preis von ${gesamtPreisInklGebuehren.value}€ inkl. Gebühren`);
            // Schließe das Modal nach dem Kauf
            const modal = bootstrap.Modal.getInstance(kaufenModal.value);
            modal.hide();
        };


        const openZusammenfassungKaufenModal = () => {
            // Öffnen des Zusammenfassung-Kaufen-Modals
            const zusammenfassungModalInstance = new bootstrap.Modal(zusammenfassungKaufenModal.value);
            zusammenfassungModalInstance.show();

            // Schließen des Kaufen-Modals
            const kaufenModalInstance = bootstrap.Modal.getInstance(kaufenModal.value);
            kaufenModalInstance.hide();

            const gekaufteAnzahlAktien = anzahlAktien;
            return gekaufteAnzahlAktien;
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

            // Aktualisiere den Chart mit den neuen Datenpunkten
            lineChart.data.datasets[0].data.push({ x: new Date(), y: lastBuyPrice.value });
            lineChart.data.datasets[1].data.push({ x: new Date(), y: lastSellPrice.value });

            lineChart.update();
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
            anzahlAktien,
            gesamtPreisGeldkurs,
            gesamtPreisBriefkurs,
            gebuehren,
            gesamtPreisInklGebuehren,
            validierteAnzahlAktien,
            handleKaufen,
            openKaufenModal,
            openVerkaufenModal,
            openZusammenfassungKaufenModal,
            chartRef,
            lastBuyPrice,
            lastSellPrice,
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