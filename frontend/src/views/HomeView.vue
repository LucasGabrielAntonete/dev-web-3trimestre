<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import { ref } from 'vue'
const email = ref(null)
const password = ref(null)
const router = useRouter()
const userStore = useUserStore()
async function loginUser() {
  try {
    const user = {
      email: email.value,
      password: password.value
    }
    await userStore.login(user)
    router.push('/movies')
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <main class="bg-black">
    <div class="m-auto w-1/2 flex flex-col h-screen justify-center items-center gap-6">
      <div class="flex flex-col h-1/2 text-start w-2/3 gap-3">
        <h1 class="text-3xl font-bold text-center text-white">Login</h1>
        <p class="text-lg text-center font-light text-white">
          Ainda não tem uma conta?
          <RouterLink :to="{ name: 'registroView' }">
            <span class="text-green-600 cursor-pointer">Registre-se</span>!
          </RouterLink>
        </p>
        <div class="flex flex-col gap-5">
          <div class="relative flex items-center">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="bg-transparent p-4 border-2 rounded-2xl border-white outline-none w-full pl-12"
            />
          </div>
          <div class="relative flex items-center">
            <div class="w-full relative flex items-center">
              <input
                v-model="password"
                placeholder="Senha"
                class="bg-transparent p-4 border-2 rounded-2xl border-white outline-none w-full pl-12"
              />
            </div>
          </div>
        </div>
        <RouterLink :to="{ name: 'forgotPasswordView' }">
          <p class="text-end text-cyan text-white font-light cursor-pointer">Esqueceu a senha?</p>
        </RouterLink>
        <button
          class="bg-green-600 p-4 rounded-2xl text-xl text-white font-black"
          @click="loginUser"
        >
          Login
        </button>
      </div>
    </div>
  </main>
</template>
