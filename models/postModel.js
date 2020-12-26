const mongoose = require("mongoose");
// ======================
// MONGODB DOC-OBJ SCHEMA
// ======================
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});
// ======================
// MONGODB DOC-OBJ MODEL-INTERFACE
// ======================
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
