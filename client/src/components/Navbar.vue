<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2">
    <div class="container-fluid">
      <!-- Logo + Brand -->
      <div class="navbar-brand d-flex align-items-center">
        <img
          src="https://img.icons8.com/color/48/000000/books.png"
          alt="Library Logo"
          width="30"
          height="30"
          class="me-2"
        />
        <strong class="text-white">Online Library</strong>
      </div>

      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-6">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link">Books</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated && !isAdmin">
            <router-link to="/history" class="nav-link">Borrow History</router-link>
          </li>
        </ul>

        <!-- Right Side -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-6">
          <!-- Not Logged In -->
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">User Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/admin-login" class="nav-link">Admin Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
          </template>

          <!-- Admin Logged In -->
          <template v-if="isAuthenticated && isAdmin">
            <li class="nav-item">
              <router-link to="/admin" class="nav-link">Admin Panel</router-link>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-danger fw-semibold" @click="logout">Logout</a>
            </li>
          </template>

          <!-- User Logged In -->
          <template v-if="isAuthenticated && !isAdmin">
            <li class="nav-item d-flex align-items-center text-warning fw-semibold">
              <span class="nav-link">Hello, {{ username }}</span>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link text-danger fw-semibold" @click="logout">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      token: localStorage.getItem('token'),
      username: localStorage.getItem('username') || 'User'
    };
  },
  computed: {
    isAuthenticated() {
      return !!this.token;
    },
    isAdmin() {
      if (!this.token) return false;
      try {
        const payload = JSON.parse(atob(this.token.split('.')[1]));
        return payload.role === 'admin';
      } catch (err) {
        return false;
      }
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.token = null;
      this.username = 'User';
      this.$router.push('/login');
      setTimeout(() => window.location.reload(), 100);
    }
  }
};
</script>

<style scoped>
.navbar-nav .nav-link {
  transition: color 0.3s;
}
.navbar-nav .nav-link:hover {
  color: #ffc107 !important;
}
</style>
