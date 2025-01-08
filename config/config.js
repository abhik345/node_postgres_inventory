module.exports = {
    development: {
        username: "postgres",
        password: "abhik!@#$",
        database: "inventory_db",
        host: "localhost",
        dialect: "postgres",
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}