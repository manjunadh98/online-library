<template>
  <div class="page-wrapper">
    <div class="container mt-5 bg-white shadow p-4 rounded">
      <h2 class="mb-4 text-center">Register</h2>
      <form @submit.prevent="register">
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
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
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
        <button type="submit" class="btn btn-success w-100">Register</button>
      </form>
      <p class="mt-3 text-center">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterView',
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/api/auth/register', this.form);
        alert('Registration successful! Please log in.');
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Registration failed. Please check your inputs.');
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1519682577862-22b62b24e493?fit=crop&w=1600&q=80'); /* Library theme */
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.95);
}
</style>
