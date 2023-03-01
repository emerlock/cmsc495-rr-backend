/* ||  TODO recipe api route controllers/handlers */
const mongoose = require('mongoose')
/*

*/
const Recipe = require('../models/recipeModel')

/*
   * Get all recipes
   * @route GET /api/recipes
*/
const getAllRecipes = async (req, res) => {

    const query = Recipe.find({ user_id: req.user._id });
    query.read("primary")
    query.then((result) => {
        console.log(result)
        res.status(200).json(result)
    }).catch((err) => {
        console.log(err.message)
        res.status(500).send(err)
    })

}

/*
   * Get Single recipe
   * @route GET /api/recipes/id
*/
const getSingleRecipe = async (req, res) => {

    // when retrieving in front end, we can use fetch(URL + id to get)
    const { id } = req.params

    // if there is no id supplied or undefined
    if (!id) {
        return res.status(400).json({ message: 'ID is missing'})
    }

    // if the id supplied cannot be converted to ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID is invalid'})
    }

    // if something is retrieved, should be populated: this is alternative to thenables, with a catch if await fails
    const retrievedRecipe = await Recipe.findOne({ _id: id, user_id: req.user._id }).catch((err => err.message))

    // if the recipe does not exist 
    if (!retrievedRecipe) {
        return res.status(400).json({ message: 'Recipe does not exist'})
    }

    //can the document be jsonified?
    res.status(200).json({ response: retrievedRecipe })
    
}

/*
   * Search Single recipe
   * @route GET /api/recipes/search
*/
const searchSingleRecipe = async (req, res) => {

    // when retrieving in front end, we can use fetch(URL + id to get)
    const name = req.query.name

    // if there is no id supplied or undefined
    if (!name) {
        return res.status(400).json({ message: 'Name is missing'})
    }

    // if something is retrieved, should be populated: this is alternative to thenables, with a catch if await fails
    const retrievedRecipeList = await Recipe.find({ name: name, user_id: req.user._id })

    // if the recipe does not exist 
    if (!retrievedRecipeList.length) {
        return res.status(400).json({ message: 'Recipe does not exist'})
    }

    //can the document be jsonified?
    res.status(200).json(retrievedRecipeList[0])

}

/*
   * Create single recipe
   * @route POST /api/recipes
*/
const createRecipe = async (req, res) => {

    try{
        /* 
            *Get user input from the request body and save it to recipe
        */
        
        const recipe = await Recipe.create({...req.body, user_id: req.user._id})
        res.status(201).json({ msg: "Recipe Created", recipe: recipe })
    } catch (err) {
        res.status(500).json( { error: err.message })
    }

}

/*
   * Update already existing recipe
   * Send request object in body, can grab ID from there
   * @route PATCH /api/recipes
*/
const updateRecipe = async (req, res) => {

    // when retrieving in front end, we can use fetch(URL + id to get)
    const { id } = req.params

    // check for request body
    if(!req.body){
        return res.status(400).json({ message: 'Request body is missing'})
    }

    // if there is no id supplied or undefined
    if (!id) {
        return res.status(400).json({ message: 'ID is missing'})
    }

    // if the id supplied cannot be converted to ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID is invalid'})
    }

    // if something is updated, should be populated: this is alternative to thenables, with a catch if await fails
    const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id, user_id: req.user._id }, req.body).catch((err => err.message))

    // if the recipe does not exist 
    if (!updatedRecipe) {
        return res.status(400).json({ message: 'Recipe does not exist'})
    }

    res.status(200).json({ message: `Recipe with the id of ${updatedRecipe._id}, and the title ${updatedRecipe.name} has been updated!` })

}

/*
   * Delete single recipe
   * @route DELETE /api/recipes/id
*/
const deleteRecipe = async (req, res) => {
    // when deleting in front end, we can use fetch(URL + id to delete)
    const { id } = req.params

    // if there is no id supplied or undefined
    if (!id) {
        return res.status(400).json({ message: 'ID is missing'})
    }

    // if the id supplied cannot be converted to ObjectId
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'ID is invalid'})
    }

    // if something is deleted, should be populated: this is alternative to thenables, with a catch if await fails
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id, user_id: req.user._id }).catch((err => err.message))

    // if the recipe does not exist 
    if (!deleteRecipe) {
        return res.status(400).json({ message: 'Recipe does not exist'})
    }

    res.status(200).json({ message: `Recipe with the id of ${deletedRecipe._id}, and the title ${deletedRecipe.name} has been deleted!` })
}

module.exports = {
    getAllRecipes,
    getSingleRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchSingleRecipe,
}