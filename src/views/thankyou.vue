<template>
  <div class="col-12 col-sm-10 col-md-8 col-lg-5">
    <div class="card border-light shadow-sm p-3 mb-5 bg-white rounded card-body text-center " >
      
        
          <h2 class="mb-4 custom-margin-thankyoucardtop">Danke fürs Spielen!</h2>
          <p class="p-size">Wir hoffen, es hat dir Spaß gemacht.</p>
          <div class="d-flex justify-content-center gap-3 mt-4">
            <button type="button" class="btn btn-primary rounded-pill custom-margin-thankyoucardbottom" @click="restartGame">
              Nochmal spielen
            </button>
            <button type="button" class="btn btn-secondary rounded-pill custom-margin-thankyoucardbottom" @click="returnToRegistration">
              Zurück zur Registrierung
            </button>
          </div>
        </div>
      </div>
    
  
</template>

<script>
export default {
  name: 'ThankYouView',
  setup() {
    const restartGame = () => {
      location.href = '/startseite'; // Ändern Sie dies zur entsprechenden URL für ein neues Spiel
    };

    const returnToRegistration = () => {
      location.href = '/'; // Geht zurück zur Registrierung
    };

    return {
      restartGame,
      returnToRegistration,
    };
  },
};
</script>


  
<style>
.thank-you-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.custom-margin-thankyoucardbottom{
  
  margin-bottom: 5rem;
}
.custom-margin-thankyoucardtop{
  
  margin-top: 5rem;
}

.p-size {
  font-size: 18px; /* Erhöht die Schriftgröße */
}
</style>