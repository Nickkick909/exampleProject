const { Sequelize } = require('sequelize');
const config = require('./lib/config.js');

const sequelize = new Sequelize(config.database.url + "/test_db", config.database.options);

console.log("connecting to "+ config.database.url);
const modelDefiners = [
    require('./models/recipe.js'),
    require('./models/ingredient.js'),
    require('./models/step.js'),

];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// foreign key constraints and joins
sequelize.models.recipe.hasMany(sequelize.models.ingredient);
sequelize.models.recipe.hasMany(sequelize.models.step);

sequelize.sync({force: false})


// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;