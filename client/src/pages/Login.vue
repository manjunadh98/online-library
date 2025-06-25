<template>
  <div class="container mt-5">
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

const loginUser = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value,
    })
    localStorage.setItem('token', res.data.token)
    router.push('/')
  } catch (err) {
    alert('Login failed. Please check your credentials.')
  }
}
</script>
