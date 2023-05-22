import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      'UserProjects',
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: 'user_project_unique',
          references: {
            model: 'Users',
            key: 'id',
          },
          validate: {
            isUUID: 4,
            notEmpty: true,
          },
          onDelete: 'CASCADE',
        },
        projectId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: 'user_project_unique',
          references: {
            model: 'Projects',
            key: 'id',
          },
          validate: {
            isUUID: 4,
            notEmpty: true,
          },
          onDelete: 'CASCADE',
        },
        role: {
          type: DataTypes.ENUM('owner', 'admin', 'member'),
          allowNull: false,
          validate: {
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
      },
      {
        uniqueKeys: {
          user_project_unique: {
            fields: ['userId', 'projectId'],
          },
        },
      },
    );
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('UserProjects');
  },
};
