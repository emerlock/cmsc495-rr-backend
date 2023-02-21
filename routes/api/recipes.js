/* ||  TODO recipe api routes */
const express = require('express')
const router = express.Router()
const recipeController = require('../../controllers/recipeController')

// basic route, /api/recipes
router.route('/')
        .get(recipeController.getAllRecipes)
        .post(recipeController.createRecipe)

// This route makes it so that you can access req.query.name: path /api/recipes/search
router.route('/search')
        .get(recipeController.searchSingleRecipe)

// This route makes it so that you can access req.params.id: path /api/recipes/id
router.route('/:id')
        .get(recipeController.getSingleRecipe)
        .delete(recipeController.deleteRecipe)
        .patch(recipeController.updateRecipe)

module.exports = router