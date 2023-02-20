var express = require('express');
var router = express.Router();
var recipe = require('../controllers/recipe.js');


router.get("/", recipe.getAll);

router.post("/", recipe.create);


module.exports = router;