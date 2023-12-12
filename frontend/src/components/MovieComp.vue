<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="movie-container">
    <h2>{{ props.movie.title }}</h2>
    <div class="flex-container">
      <img
        :src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`"
        :alt="props.movie.title"
      />
      <div class="container">
        <p class="overview">Descrição:
          {{ props.movie.overview }}</p>
        <p>Data Lançamento: {{ props.movie.release_date }}</p>
        <p>Críticas: {{ props.movie.vote_average }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 1rem;
  width: 100%;
  margin-left: 10vw;
}

h2 {
  color: white;
  background-color: black;
  padding: 1%;
  width: 100%;
  text-align: center;
}
.movie-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1rem;
  overflow: hidden;
}
.container {
  width: 100%;
  display: flex;
  align-items: center;
  row-gap: 1rem;
  flex-direction: column;
  
}

.movie-container {
  width: 100%;
  background-size: cover;
  background-color: rgb(36, 36, 36);
  background-blend-mode: overlay;
}

h2 {
  filter: none;
  color: white;
  background-color: black;
}

p {
  color: white;
  background-color: black;
  padding: 1%;
  width: 50%;
  transition: background-color 2s ease-out 100ms
}

p:hover {
  background-color: #FF1493;
}

.overview {
  width: 50%;
}
</style>
