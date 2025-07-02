<template>
  <div class="admin-login-wrapper">
    <div class="admin-login-form">
      <h2 class="text-center mb-4">Admin Login</h2>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            v-model="username"
            type="text"
            class="form-control"
            id="username"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminLoginView',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        });

        const token = res.data.token;
        const payload = JSON.parse(atob(token.split('.')[1]));

        if (payload.role !== 'admin') {
          this.error = 'Access denied. Only admins can log in here.';
          return;
        }

        localStorage.setItem('token', token);
        localStorage.setItem('username', payload.username);
        this.$router.push('/admin');
      } catch (err) {
        this.error = 'Invalid credentials or server error.';
      }
    }
  }
};
</script>

<style scoped>
.admin-login-wrapper {
  min-height: 100vh;
  background-image: url('https://plus.unsplash.com/premium_photo-1703701579660-8481915a7991?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}


.admin-login-form {
  max-width: 500px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>
