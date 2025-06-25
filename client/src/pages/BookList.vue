<template>
  <div class="container mt-4">
    <h2>Book List</h2>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item">
        <strong>{{ book.title }}</strong> by {{ book.author }}
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
  mounted() {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        this.books = response.data;
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }
};
</script>
