<template>
  <div class="container mt-4">
    <h2>Your Borrow History</h2>
    <div v-if="history.length === 0">No borrow history found.</div>
    <div v-else>
      <table class="table table-bordered table-hover mt-3">
        <thead class="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Borrow Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="record in history" :key="record.id">
            <td>{{ record.Book.title }}</td>
            <td>{{ record.Book.author }}</td>
            <td>{{ formatDate(record.borrowDate) }}</td>
            <td>{{ record.returnDate ? formatDate(record.returnDate) : 'Not Returned' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      history: []
    }
  },
  mounted() {
    this.fetchHistory()
  },
  methods: {
    async fetchHistory() {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/borrow/history', {
          headers: { Authorization: `Bearer ${token}` }
        })
        this.history = res.data
      } catch (err) {
        console.error('Failed to fetch history', err)
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString()
    }
  }
}
</script>
