<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <AktienCard></AktienCard>
      </div>
      <div class="col-md-5">
        <Geldbeutel></Geldbeutel>
        <Verlauf></Verlauf>

        <div class="d-flex flex-column align-items-center">
          <button type="submit" class="btn btn-outline-secondary rounded-pill w-50" @click.prevent="endGame">Spiel beenden</button>
          <div class="spielbeenden">Spiel endet automatisch in {{ remainingTimeFormatted }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import AktienCard from '@/components/AktienCard.vue';
import Geldbeutel from '@/components/Geldbeutel.vue';
import Verlauf from '@/components/Verlauf.vue';

import { useRouter } from 'vue-router';

export default {
  name: 'StartseiteView',
  components: {
    AktienCard,
    Geldbeutel,
    Verlauf
  },
  setup() {
    const router = useRouter();
    const remainingTime = ref(10 * 60); // 10 Minuten in Sekunden

    const remainingTimeFormatted = computed(() => {
      const minutes = Math.floor(remainingTime.value / 60);
      const seconds = remainingTime.value % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    const countdown = () => {
      if (remainingTime.value > 0) {
        remainingTime.value--;
      } else {
        endGame();
      }
    };

    const endGame = () => {
      clearInterval(timerInterval);
      router.push('/thankyou');
    };

    let timerInterval;

    onMounted(() => {
      timerInterval = setInterval(countdown, 1000);
    });

    onUnmounted(() => {
      clearInterval(timerInterval);
    });

    return {
      remainingTimeFormatted,
      endGame,
    };
  },
};

</script>

<style>
.spielbeenden {
  color: #6c757d;
  text-align: center;
  margin-top: 0.5rem;
  font-size: smaller;
  width: 100%;
}
</style>
