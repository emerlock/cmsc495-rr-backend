const mongoose = require('mongoose')

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: String,
  description: String,
  directions: [ String ],
  ingredients: [{ measurement: Number, measurementType: String, ingredient: String }],
  notes: String,
  Servings: Number,
  user_id: {
    type: String,
    required: true,
  },
})

// the Database will store the documents in a collection called recipes (lowercase and plural)
module.exports = mongoose.model('Recipe', recipeSchema)