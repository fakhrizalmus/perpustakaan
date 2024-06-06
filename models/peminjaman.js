'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Peminjaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      this.belongsTo(models.Member, {
        foreignKey: 'memberId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    }
  }
  Peminjaman.init({
    bookId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    tglPinjam: DataTypes.DATE,
    tglPengembalian: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Peminjaman',
  });
  return Peminjaman;
};