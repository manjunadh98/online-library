<template>
  <div class="container mt-5">
    <h2 class="mb-4 text-center">Admin Panel</h2>

    <div class="row">
      <!-- User Management -->
      <div class="col-md-6">
        <h4>Manage Users</h4>
        <ul class="list-group">
          <li
            v-for="user in users"
            :key="user.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ user.username }} ({{ user.role }})
            <button
              class="btn btn-danger btn-sm"
              @click="deleteUser(user.id)"
              :disabled="user.role === 'admin'"
            >
              Delete
            </button>
          </li>
        </ul>
      </div>

      <!-- Book Management -->
      <div class="col-md-6">
        <h4>Manage Books</h4>
        <form @submit.prevent="addBook">
          <input v-model="newBook.title" class="form-control mb-2" placeholder="Title" required />
          <input v-model="newBook.author" class="form-control mb-2" placeholder="Author" required />
          <textarea
            v-model="newBook.description"
            class="form-control mb-2"
            placeholder="Description"
          ></textarea>
          <button class="btn btn-success w-100">Add Book</button>
        </form>

        <ul class="list-group mt-3">
          <li
            v-for="book in books"
            :key="book.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ book.title }} by {{ book.author }}
            <button class="btn btn-danger btn-sm" @click="deleteBook(book.id)">Delete</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      books: [],
      newBook: {
        title: '',
        author: '',
        description: ''
      }
    };
  },
  async mounted() {
    await this.fetchUsers();
    await this.fetchBooks();
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.users = res.data;
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    },
    async deleteUser(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.fetchUsers();
    },
    async fetchBooks() {
      const res = await axios.get('http://localhost:5000/api/books');
      this.books = res.data;
    },
    async addBook() {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/admin/books', this.newBook, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.newBook = {
        title: '',
        author: '',
        description: ''
      };
      this.fetchBooks();
    },
    async deleteBook(id) {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      this.fetchBooks();
    }
  }
};
</script>
