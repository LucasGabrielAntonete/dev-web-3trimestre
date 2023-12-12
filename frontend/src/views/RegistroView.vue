<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const email = ref(null)
const password = ref(null)

async function registerUser() {
  try {
    const user = {
      email: email.value,
      password: password.value
    }
    await userStore.register(user)
    router.push('/')
  } catch (error) {
    console.log('error', error)
  }
}
</script>
<template>
  <main class="bg-white">
    <div class="m-auto w-1/2 flex flex-col h-screen justify-center items-center gap-6">
      <div class="flex flex-col h-1/2 text-start w-2/3 gap-3">
        <h1 class="text-3xl font-bold text-center">Registro</h1>
        <p class="text-lg text-center font-light">
          Registre-se para ter acesso a todos os filmes e séries!
        </p>
        <div class="flex flex-col gap-5">
          <div class="relative flex items-center">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="bg-transparent p-4 border-2 rounded-2xl border-red-500 outline-none w-full pl-12"
            />
          </div>
          <div class="relative flex items-center">
            <div class="w-full relative flex items-center">
              <input
                v-model="password"
                placeholder="Senha"
                class="bg-transparent p-4 border-2 rounded-2xl border-red-500 outline-none w-full pl-12"
              />
            </div>
          </div>
        </div>
        <button
          class="bg-red-600 p-4 rounded-2xl text-xl text-white font-black"
          @click="registerUser"
        >
          Registro
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
