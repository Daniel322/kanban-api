import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Projects', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      creatorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        validate: {
          isUUID: 4,
          notEmpty: true,
        },
      },
      teamId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Teams',
          key: 'id',
        },
        validate: {
          isUUID: 4,
          notEmpty: true,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Projects');
  },
};
