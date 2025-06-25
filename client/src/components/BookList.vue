<template>
  <div class="container mt-4">
    <h2>Book List</h2>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item">
        <h5>{{ book.title }}</h5>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p>{{ book.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BookList',
  data() {
    return {
      books: []
    };
  },
  async mounted() {
    try {
      const res = await axios.get('http://localhost:5000/api/books');
      this.books = res.data;
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  }
};
</script>
