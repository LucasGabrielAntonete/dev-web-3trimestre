<script setup>
import { ref, onMounted } from 'vue'
import api from '../plugins/axios'
import HeaderComp from '@/components/HeaderComp.vue'
import useGenreStore from '@/stores/genre'
import 'vue-loading-overlay/dist/css/index.css'
import MovieComp from '@/components/MovieComp.vue'

const movies = ref([])
const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')
const isLoading = ref(false)
const genreStore = useGenreStore()
const showMovie = ref(false)
const currentMovie = ref({})

const loadMovie = (movie) => {
  currentMovie.value = movie
  showMovie.value = true
}

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('movie')
  isLoading.value = false
})

const listMovies = async (genreId) => {
  genreStore.setCurrentGenreId(genreId)
  isLoading.value = true
  const response = await api.get('discover/movie', {
    params: {
      with_genres: genreId,
      language: 'pt-BR'
    }
  })
  movies.value = response.data.results
  isLoading.value = false
}
</script>
<template>
  <HeaderComp></HeaderComp>

  <main>
    <div v-if="showMovie">
      <button class="bg-blue-400" @click="showMovie = false">Voltaro</button>
    <MovieComp  :movie="currentMovie" @close="showMovie = false" />
  </div>
    <div v-else>
      <h1>Gêneros de filmes</h1>
      <ul class="genre-list">
        <li
          v-for="genre in genreStore.genres"
          :key="genre.id"
          @click="listMovies(genre.id)"
          class="genre-item"
          :class="{ active: genre.id === genreStore.currentGenreId }"
        >
          {{ genre.name }}
        </li>
      </ul>

      <loading v-model:active="isLoading" is-full-page />

      <div class="flex flex-wrap justify-between gap-8">
        <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="loadMovie(movie)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          <div class="movie-details">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
            <p class="movie-genres">{{ movie.genre_ids }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: #387250;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #000000;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #4e9e5f;
  box-shadow: 0 0 0.5rem #387250;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  box-shadow: 0 0 0.5rem red;
  font: 1.5rem sans-serif;
  cursor: pointer;
  will-change: transform;
  color: rgb(0, 0, 0);
}

.movie-card:hover {
  -xpedu-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
}

.movie-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
}

.movie-details {
  padding: 0 0.5rem;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}

.active {
  background-color: #67b086;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: #abc322;
  color: #000;
  font-weight: bolder;
}
</style>
