module.exports = (sequelize, DataTypes) => {
  const Borrow = sequelize.define('Borrow', {
    borrowDate: DataTypes.DATE,
    returnDate: DataTypes.DATE
  });
  return Borrow;
};
