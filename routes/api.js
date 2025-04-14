/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require('../models/books.js');

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        const books = await Book.find({}, '_id title commentcount');
        return res.json(books);
      } catch (e) {
        res.status(500).json({ error: e });
      }
    })
    
    .post(async (req, res) => {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.json('missing required field title');
      }

      try {
        const newBook = new Book({ title });
        const savedBook = await newBook.save();
        return res.json({
          _id: savedBook._id,
          title: savedBook.title
        });
      } catch (err) {
        return res.status(500).json({ error: 'Cannot add new book' })
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        const book = await Book.findById(bookid);
        if (!book) { return res.json('no book exists') };
        return res.json({_id: book._id, title: book.title, comments: book.comments});
      } catch (e) {
        return res.status(500).json({ error: 'server error' });
      }
    })
    
    .post(async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        return res.json('missing required field comment');
      }

      try {
        const updatedBook = await Book.findByIdAndUpdate(
          bookid,
          {
            $push: { comments: comment },
            $inc: { commentcount: 1 }
          },
          {new: true}
        )
        if (!updatedBook) { return res.json('no book exists') };

        return res.json({_id: updatedBook._id, title: updatedBook.title, comments: updatedBook.comments});
      } catch(e) {
        return res.json(e);
      }
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
