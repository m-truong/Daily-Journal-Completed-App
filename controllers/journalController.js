require('dotenv').config();
const express = require('express');
const journalController = express.Router();
const {homeStartingContent} = require("../app.js");

// Authentication
const jwt = require('jsonwebtoken');
// Auth Middleware ...

// MongoDB Connection
const Post = require('../models/postModel.js');

// ======================
// RESTFUL-ROUTES 
// ======================

// ===============
// INDEX: display a list of all resources
// ===============
journalController.get('/', (req, res) => {
  Post.find({}, (err, foundPosts) => {
      if (!err) {
        res.render('home', {
          homeStartingContent: homeStartingContent,
          posts: foundPosts
        })
      } else {
        console.error(err)
      }
    })
  })


// ===============
// NEW(Presentational-route): DISPLAY a <form> to add to database
// ===============
journalController.get('/compose', (req, res) => {
  res.render('compose')
})


// ===============
// CREATE(Functional-route): create a NEW resource (always ===> redirects)
// ===============
journalController.post('/compose', (req, res) => {
  const newPost = {
    title: req.body.postTitle,
    content: req.body.postBody
  }
  Post.create(newPost, (err, createdNewPost) => {
    if (!err) {
      res.redirect('/')
    } else {
      console.error(err)
    }
  })

})

// ===============
// SHOW(Presentational-route): DISPLAY an individual resource
// ===============
journalController.get('/posts/:id', (req, res) => {
  // console.log(req.params.id)
  const requestedPostID = req.params.id
  Post.findById(requestedPostID, (err, foundPost) => {
    if (!err) {
      res.render('post', {
        postTitle: foundPost.title,
        postBody: foundPost.content
      })
    } else {
      console.error(err)
    }
  })
})

module.exports = journalController;
