import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './dev.sqlite3',   // The file path for the database
  logging: false,
});

export default sequelize;