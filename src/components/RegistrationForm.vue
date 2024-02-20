<template>
  <div class="col-12 col-sm-10 col-md-8 col-lg-5">

    <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded">
      <div class="card-body">
        <div class="custom-margin">
          <h2 class="text-center mb-4 "> <b>trade</b>lou | Registrierung</h2>
        </div>
        <div class="d-flex justify-content-center">
          <form class="w-100">
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputVorname" class="col-form-label">Vorname</label>
              </div>
              <div class="col-7">
                <input type="vorname" id="inputVorname" class="form-control" v-model="vorname" :class="{ 'is-invalid': !formValid && !vorname }">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputNachname" class="col-form-label">Nachname</label>
              </div>
              <div class="col-7">
                <input type="nachname" id="inputNachname" class="form-control" v-model="nachname" :class="{ 'is-invalid': !formValid && !nachname }">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputMail" class="col-form-label">E-Mail</label>
              </div>
              <div class="col-7">
                <input type="email" id="inputMail" class="form-control" placeholder="name@example.com"
                  @blur="checkEmailValidity" v-model="email" :class="{ 'is-invalid': !formValid && !email }">
                  <div id="emailError" class="text-danger"> </div>
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputBirthday" class="col-form-label">Geburtstag</label>
              </div>
              <div class="col-7">
                <input type="date" id="inputBirthday" class="form-control" @change="checkAge" v-model="birthday" :class="{ 'is-invalid': !formValid && !birthday }">
                <div id="ageError" class="text-danger"> </div>
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputStreet" class="col-form-label">Straße</label>
              </div>
              <div class="col-7">
                <input type="street" id="inputStreet" class="form-control" v-model="street" :class="{ 'is-invalid': !formValid && !street }" >
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputHausnummer" class="col-form-label">Hausnummer</label>
              </div>
              <div class="col-7">
                <input type="hausnummer" id="inputHausnummer" class="form-control" v-model="hausnummer" :class="{ 'is-invalid': !formValid && !hausnummer }" >
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputPLZ" class="col-form-label">PLZ</label>
              </div>
              <div class="col-7">
                <input type="zip" id="inputPLZ" class="form-control" v-model="zip" :class="{ 'is-invalid': !formValid && !zip }">
              </div>
            </div>
            <div class="row mb-3 d-flex justify-content-center">
              <div class="col-3">
                <label for="inputOrt" class="col-form-label">Ort</label>
              </div>
              <div class="col-7">
                <input type="ort" id="inputOrt" class="form-control" v-model="ort" :class="{ 'is-invalid': !formValid && !ort }">
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary rounded-pill custom-margin w-50"
                @click.prevent="submitForm">Registrieren</button>  
                
            </div>
            <div class="text-center text-danger" v-if="!formValid">
              Bitte füllen Sie alle Felder aus.
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'RegistrationForm',
  data() {
    return {
      vorname: '', // weitere Felder hier hinzufügen
      nachname: '',
      birthday:'',
      street: '',
      hausnummer: '',
      zip: '',
      ort: '',
      email: '',
      formValid: true, // Zustand zur Verfolgung des Validierungsstatus
      submitted: false // Gibt an, ob das Formular bereits eingereicht wurde
    };
  },
  methods: {
  submitForm() {
    // Überprüfen, ob alle Felder ausgefüllt sind
    if (
      this.vorname.trim() === '' ||
      this.nachname.trim() === '' ||
      this.street.trim() === '' ||
      this.hausnummer.trim() === '' ||
      this.zip.trim() === '' ||
      this.ort.trim() === '' ||
      this.birthday.trim() === '' ||
      this.email.trim() === ''
    ) {
      this.formValid = false;
      this.submitted = true; // Formular wurde eingereicht
      return;
    }

    // Überprüfen der Geburtstagsbedingung
    var birthDate = new Date(this.birthday);
    var now = new Date();
    var yearsDiff = now.getFullYear() - birthDate.getFullYear();
    var monthsDiff = now.getMonth() - birthDate.getMonth();
    var daysDiff = now.getDate() - birthDate.getDate();

    // Adjust months difference if current day is before birth day
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthsDiff += (monthsDiff < 0) ? 12 : 0;
    }

    // Calculate days difference
    if (daysDiff < 0) {
      var prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      daysDiff += prevMonthLastDay;
      monthsDiff--;
    }

    if (yearsDiff < 18 || (yearsDiff === 18 && (monthsDiff > 0 || daysDiff > 0))) {
      this.formValid = false;
      this.submitted = true; // Formular wurde eingereicht
      document.getElementById("ageError").innerText = "Sie müssen mindestens 18 Jahre alt sein, um tradlou zu nutzen.";
      return;
    }

    // Überprüfen der E-Mail-Bedingung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (!emailRegex.test(this.email)) {
      this.formValid = false;
      this.submitted = true; // Formular wurde eingereicht
      document.getElementById("emailError").innerText = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
      return;
    }

    // Wenn alle Bedingungen erfüllt sind, wird das Formular weitergeleitet
    this.$router.push('/startseite'); // Navigiert zur neuen Seite
  },
  checkAge(event) {
    var birthDate = new Date(event.target.value);
    var now = new Date();

    var yearsDiff = now.getFullYear() - birthDate.getFullYear();
    var monthsDiff = now.getMonth() - birthDate.getMonth();
    var daysDiff = now.getDate() - birthDate.getDate();

    // Adjust months difference if current day is before birth day
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      yearsDiff--;
      monthsDiff += (monthsDiff < 0) ? 12 : 0;
    }

    // Calculate days difference
    if (daysDiff < 0) {
      var prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      daysDiff += prevMonthLastDay;
      monthsDiff--;
    }

    if (yearsDiff < 18 || (yearsDiff === 18 && (monthsDiff > 0 || daysDiff > 0))) {
      document.getElementById("ageError").innerText = "Sie müssen mindestens 18 Jahre alt sein, um tradlou zu nutzen.";
    } else {
      document.getElementById("ageError").innerText = "";
    }
  },
  checkEmailValidity(event) {
    const email = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

    if (!emailRegex.test(email)) {
      document.getElementById("emailError").innerText = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    } else {
      document.getElementById("emailError").innerText = "";
    }
  }
  }}
</script>
  
<style scoped>
/* Stildefinitionen für die Komponente können hier hinzugefügt werden */
.custom-margin {
  margin: 2rem;
  margin-bottom: 3rem;
}

.rounded-pill {
  border-radius: 50rem;
  /* oder ein anderer gewünschter Wert */
}

.is-invalid {
  border: 1px solid red; /* Rote Umrandung für ungültige Felder */
}
</style>