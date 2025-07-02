<template>
  <div class="page-wrapper">
    <div class="container mt-5 bg-white shadow p-4 rounded">
      <h2 class="mb-4 text-center">User Login</h2>
      <form @submit.prevent="login">
        <div class="form-group mb-3">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="form.username"
            class="form-control"
            required
          />
        </div>
        <div class="form-group mb-3">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
      <p class="mt-3 text-center">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', this.form);
        const token = response.data.token;

        localStorage.setItem('token', token);
        localStorage.setItem('username', this.form.username); // ✅ Added line to store username

        alert('Login successful');
        this.$router.push('/books');
      } catch (error) {
        console.error(error);
        alert('Username and password required or incorrect');
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.2); /* Transparent white */
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}


</style>
