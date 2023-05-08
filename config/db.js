const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tech', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    timezone: '+07:00',
    port:8111
    
});

sequelize.authenticate()
    .then(() => {
        console.log('DB connection established successfully')
    })
    .catch((error) => {
        console.log(error)
    })
sequelize.sync();
module.exports = sequelize