<template>
  <div class="container mt-4">
    <h2>Add a Book</h2>
    <form @submit.prevent="submitBook">
      <div class="mb-3">
        <label>Title</label>
        <input v-model="title" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Author</label>
        <input v-model="author" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Description</label>
        <textarea v-model="description" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-success">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddBook',
  data() {
    return {
      title: '',
      author: '',
      description: ''
    };
  },
  methods: {
    async submitBook() {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:5000/api/books',
          {
            title: this.title,
            author: this.author,
            description: this.description
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        alert('Book added successfully!');
        this.title = '';
        this.author = '';
        this.description = '';
        this.$router.push('/');
      } catch (error) {
        alert('Failed to add book');
        console.error(error);
      }
    }
  }
};
</script>
