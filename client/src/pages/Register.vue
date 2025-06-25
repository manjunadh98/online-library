<template>
  <div class="container mt-5">
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <div class="mb-3">
        <label>Name</label>
        <input v-model="name" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-success">Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const router = useRouter()

const registerUser = async () => {
  try {
    await axios.post('http://localhost:5000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })
    router.push('/login')
  } catch (err) {
    alert('Registration failed. Try again.')
  }
}
</script>
