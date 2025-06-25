<template>
  <div class="container mt-4">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-success">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        alert('Registration successful');
        this.$router.push('/login');
      } catch (error) {
        alert('Registration failed');
        console.error(error);
      }
    }
  }
};
</script>
