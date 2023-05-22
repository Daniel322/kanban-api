import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.createTable(
      'UserTeams',
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: 'user_team_unique',
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
        teamId: {
          type: DataTypes.UUID,
          allowNull: false,
          unique: 'user_team_unique',
          references: {
            model: 'Teams',
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
          user_team_unique: {
            fields: ['userId', 'teamId'],
          },
        },
      },
    );
  },
  down: async (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('UserTeams');
  },
};
