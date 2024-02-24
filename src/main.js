import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import des Routers
import store from './store'; // Import des Stores

// Bootstrap CSS und JS importieren
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// App-Instanz erstellen und Konfigurationen verwenden
const app = createApp(App);

// Vuex Store und Vue Router verwenden
app.use(store); // Vuex Store hinzufügen
app.use(router); // Vue Router hinzufügen

// App einbinden
app.mount('#app');