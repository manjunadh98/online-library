// server/addBooks.js
const { Sequelize } = require('sequelize');
const db = require('./models'); // Adjust if needed (i.e., path to index.js that initializes Sequelize)

const newBooks = [
  {
    title: 'Deep Work',
    author: 'Cal Newport',
    description: 'Rules for focused success in a distracted world.'
  },
  {
    title: 'Zero to One',
    author: 'Peter Thiel',
    description: 'Notes on startups, or how to build the future.'
  },
  {
    title: 'Rich Dad Poor Dad',
    author: 'Robert Kiyosaki',
    description: 'What the rich teach their kids about money.'
  },
  {
    title: 'Ikigai',
    author: 'Héctor García and Francesc Miralles',
    description: 'The Japanese secret to a long and happy life.'
  },
  {
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    description: 'A counterintuitive approach to living a good life.'
  }
];

async function addBooks() {
  try {
    await db.sequelize.sync(); // optional
    for (let book of newBooks) {
      await db.Book.create(book);
    }
    console.log('✅ 5 new books added successfully.');
    process.exit(); // exit script
  } catch (error) {
    console.error('❌ Error adding books:', error);
  }
}

addBooks();
