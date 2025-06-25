<template>
  <div class="container mt-4">
    <h2>Available Books</h2>
    <div v-if="books.length === 0">No books found.</div>
    <div v-else>
      <div v-for="book in books" :key="book.id" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">{{ book.title }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{{ book.author }}</h6>
          <p class="card-text">{{ book.description }}</p>

          <button
            class="btn btn-primary me-2"
            @click="borrowBook(book.id)"
            :disabled="loading"
          >
            Borrow
          </button>

          <button
            class="btn btn-success"
            @click="returnBook(book.id)"
            :disabled="loading"
          >
            Return
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      books: [],
      loading: false
    }
  },
  mounted() {
    this.fetchBooks()
  },
  methods: {
    async fetchBooks() {
      try {
        const res = await axios.get('http://localhost:5000/api/books')
        this.books = res.data
      } catch (err) {
        console.error('Error fetching books:', err)
      }
    },
    async borrowBook(bookId) {
      this.loading = true
      try {
        const token = localStorage.getItem('token')
        await axios.post(
          'http://localhost:5000/api/borrow',
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Book borrowed successfully!')
      } catch (err) {
        alert('Error borrowing book')
      } finally {
        this.loading = false
      }
    },
    async returnBook(bookId) {
      this.loading = true
      try {
        const token = localStorage.getItem('token')
        await axios.post(
          'http://localhost:5000/api/borrow/return',
          { bookId },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        alert('Book returned successfully!')
      } catch (err) {
        alert('Error returning book')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
