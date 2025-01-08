const {Sequelize,DataTypes} = require('sequelize');
const config = require('../config/config');


const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];



const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool,
    logging: false
});


const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Product = require("./product")(sequelize,DataTypes);
db.ProductImage = require("./productImage")(sequelize,DataTypes)


db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done!");
  });

  db.sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
