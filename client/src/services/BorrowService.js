import axios from 'axios';

const API_URL = 'http://localhost:5000/api/borrow';

const borrowBook = async (bookId, token) => {
  return axios.post(
    `${API_URL}`,
    { bookId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const getBorrowHistory = async (token) => {
  return axios.get(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export default { borrowBook, getBorrowHistory };
