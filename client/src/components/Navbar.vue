<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm px-3 py-2">
    <div class="container-fluid">
      <!-- Logo + Brand (non-clickable) -->
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

      <!-- Toggler for mobile view -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Navigation Links -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fs-6">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link">Books</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/history" class="nav-link">Borrow History</router-link>
          </li>
        </ul>

        <!-- Right Side -->
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 fs-9">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>

          <!-- Show Hello username -->
          <li class="nav-item d-flex align-items-center fw-semibold text-warning" v-if="isAuthenticated">
            <span class="nav-link">Hello, {{ username }}</span>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a href="#" class="nav-link text-danger fw-semibold" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    },
    username() {
      return localStorage.getItem('username') || 'User';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.navbar-nav .nav-link {
  transition: color 0.3s;
}

.navbar-nav .nav-link:hover {
  color: #ffc107 !important; /* Yellow on hover */
}

.navbar {
  padding-top: 4px;
  padding-bottom: 4px;
}

img {
  filter: none; /* Removes previous brightness filter */
}
</style>
