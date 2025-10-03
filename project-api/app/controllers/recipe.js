const sequelize = require('sequelize');
const { models } = require('../sequelize.js');
const Op = sequelize.Op;
const config = require('../lib/config');


exports.getAll = async (req, res) => {
    let recipies = await models.recipe.findAll({
        include: [
            {
                model: models.ingredient
            },
            {
                model: models.step,
                // order: []
            }
        ],
        order: [
            ["id", "DESC"],
            [models.step, "order", "ASC"]
        ]
    })

    res.status(200).send(recipies);
};

// API endpoint for creating a recipe
exports.create = async (req, res) => {
    // Create the recipe
    let recipe = await models.recipe.create(req.body.recipe)

    // Go through the list of ingredients and create them
    for (let ingredient of req.body.ingredients) {
        if (ingredient.ingredientName && ingredient.ingredientMeasurement && ingredient.ingredientQuantity) {
            let ingredientCreated = await models.ingredient.create({
                name: ingredient.ingredientName,
                quantity: ingredient.ingredientQuantity,
                measurement: ingredient.ingredientMeasurement,
                // Attach them to the recipe id
                recipeId: recipe.id
            })
        }
        
    }

    // Go through the steps and create them
    for (let [index, step] of req.body.steps.entries()) {
        if (step.instruction) {
            let stepCreated = await models.step.create({
                order: index,
                instruction: step.instruction,
                // Attach them to the recipe id
                recipeId: recipe.id
            })
        }
    }

    res.status(200).send(recipe);
};