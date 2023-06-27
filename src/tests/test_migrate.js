const sequelize = require('../utils/connection');
require('../modals/index')
require('../modals/Actor')
require('../modals/Director')
require('../modals/Genre')
require('../modals/Movie')

const main = async() => {
    try{
        await sequelize.sync({ force: true });
        
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();