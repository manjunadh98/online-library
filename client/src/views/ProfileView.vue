<!-- src/views/ProfileView.vue -->
<template>
  <div class="container mt-5">
    <h2 class="mb-4">My Profile</h2>
    <div class="card p-4">
      <p><strong>Username:</strong> {{ username }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      username: '',
      email: ''
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.username = user.username;
      this.email = user.email;
    }
  }
};
</script>
