const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    comments: [String],
    commentcount: {type: Number, default: 0}
}, { versionKey: false });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;