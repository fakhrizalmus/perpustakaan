'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Peminjaman, {
        foreignKey: 'memberId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
      this.belongsToMany(models.Book, {
        through: 'peminjamans',
        foreignKey: 'memberId',
        // otherKey: 'memberId'
      })
    }
  }
  Member.init({
    code: DataTypes.STRING,
    name: DataTypes.STRING,
    isPenalty: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};