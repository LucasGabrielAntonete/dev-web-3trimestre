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
    <div class="movie-container"
        :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.backdrop_path})` }">
        <h2>{{ props.movie.title }}</h2>
        <img :src="`https://image.tmdb.org/t/p/w500${props.movie.poster_path}`" :alt="props.movie.title" />
        <p class="overview">{{ props.movie.overview }}</p>
        <p>{{ props.movie.release_date }}</p>
        <p>{{ props.movie.vote_average }}</p>
    </div>
</template>

<style scoped>
.movie-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
}

.movie-container {
    text-align: center;
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
}

.overview {
    width: 50%;
}
</style>