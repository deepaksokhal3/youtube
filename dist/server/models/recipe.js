"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var recipeIngredientSchema = new mongoose.Schema({
    recipe: String,
    title: String,
    description: String,
    service_quantity: Number,
    serving_units: String,
    preparation_time: String,
    cuisine: String,
    main_ingredients: String,
    type_of_recipe: String,
    meal: String,
    preparation_method: String,
    dietary_consideration: String,
    video_type: String,
    youtube_link: String,
    youtuble_embed_url: String,
    youtube_video_id: String,
    manuel_rating: Number,
    youtube_rating: Number,
    youtube_total_comments: Number,
    youtube_publisher_name: String,
    youtube_publish_date: Date,
    youtube_original_data: String,
    created_ip: String,
    last_update_ip: String,
    recipe_status: { type: String, default: 'active' },
    holiday: String,
    account_id: String,
    created_at: { type: Date, default: Date.now }
});
var recipe = mongoose.model('recipes', recipeIngredientSchema);
exports.default = recipe;
//# sourceMappingURL=recipe.js.map