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

const show = ref(false)
</script>
<template>
  <HeaderComp></HeaderComp>

  <main>
    <div class="btnsShowMovies" v-if="showMovie">
      <button class="btn btn-danger" @click="showMovie = false">Sair da pagina</button>
      <MovieComp :movie="currentMovie" @close="showMovie = false" />
    </div>
    <div v-else>
      <div class="buttonMostrar">
      <button class="btn btn-primary" @click="show = !show">Mostrar Categorias</button>
    </div>
      <Transition name="slide-fade">
        <ul class="genre-list" v-if="show">
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
      </Transition>

      <loading v-model:active="isLoading" is-full-page />

      <div class="flex flex-wrap justify-between gap-8">
        <div v-for="movie in movies" :key="movie.id" class="movie-card" @click="loadMovie(movie)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" />
          <div class="movie-details">
            <p class="movie-title">{{ movie.title }}</p>
            <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
            <p class="movie-genres">
              <span
                v-for="genre_id in movie.genre_ids"
                :key="genre_id"
                @click="listMovies(genre_id)"
                :class="{ active: genre_id === genreStore.currentGenreId }"
              >
                {{ genreStore.getGenreName(genre_id) }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.btnsShowMovies {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(36, 36, 36);
  row-gap: 1rem;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.buttonMostrar{
  display: flex;
  justify-content: center;
}
.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
}

.genre-item {
  background-color: red;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  color: #000000;
}

.genre-item:hover {
  cursor: pointer;
  background-color: black;
  color: red;
  box-shadow: 0 0 0.5rem red;
}

.movie-card {
  width: 15rem;
  height: 30rem;
  box-shadow: 0 0 0.5rem red;
  font: 1.5rem sans-serif;
  cursor: pointer;
  will-change: transform;
  color: rgb(0, 0, 0);
  margin-left: 10px;
  margin-right: 10px;
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
  font-size: 1rem;
  font-weight: bold;
  line-height: 1rem;
  height: 3rem;
}
.movie-genres span {
  display: flex;
  background-color: brown;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-genres span:hover {
  cursor: pointer;
  background-color: red;
  box-shadow: 0 0 0.5rem red;
}

.active {
  background-color: red;
  font-weight: bolder;
}

.movie-genres span.active {
  background-color: red;
  color: #000;
  font-weight: bolder;
}
.movie-release-date{
  font-size: 0.8rem;
  font-weight: bold;
  line-height: 1rem;
  
}


</style>
