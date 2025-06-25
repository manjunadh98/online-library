const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('online_library', 'postgres', 'manjunadh', {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load models correctly and store in db object
db.User = require('./user.model.js')(sequelize, DataTypes);
db.Book = require('./book.model.js')(sequelize, DataTypes);
db.Borrow = require('./borrow.model.js')(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Borrow, { foreignKey: 'userId' });
db.Book.hasMany(db.Borrow, { foreignKey: 'bookId' });
db.Borrow.belongsTo(db.User, { foreignKey: 'userId' });
db.Borrow.belongsTo(db.Book, { foreignKey: 'bookId' });

module.exports = db;
