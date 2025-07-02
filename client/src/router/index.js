import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import Books from '../views/Books.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import BorrowHistory from '../views/BorrowHistory.vue';
import AdminLoginView from '../views/AdminLoginView.vue';
import AdminPanel from '../views/AdminPanel.vue';

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/books', name: 'Books', component: Books },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/register', name: 'Register', component: RegisterView },
  { path: '/history', name: 'BorrowHistory', component: BorrowHistory },
  { path: '/admin-login', name: 'AdminLogin', component: AdminLoginView },
  { path: '/admin', name: 'AdminPanel', component: AdminPanel }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
