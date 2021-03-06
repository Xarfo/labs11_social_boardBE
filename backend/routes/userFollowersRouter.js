/*This file will be dedicated to the userFollowers router */
require('dotenv').config();
const express = require('express');
const userFollowersDB = require('../db/models/UserFollowersDB.js');
const router = express.Router(); 
const {authenticate} = require('../config/middleware/authenticate.js');
const usersDB = require('../db/models/usersDB.js');

// get a list of users being followed by the user. 
router.get('/:user_id', (req,res) => {
  const userId = req.params.user_id; 
//   return userFollowersDB.getUserFollowers(userId)
  return userFollowersDB
    .getUserFollowers(userId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({error: `Failed to get follow list ${err}`}));
});

//add a follow for the user. 
router.post('/:user_id/:following_id', authenticate, (req,res) => {
  const userId = req.params.user_id; 
  const followingId = req.params.following_id;
   return userFollowersDB
     .followUser(userId, followingId)
     .then(results => res.status(201).json(results))
     .catch(err => res.status(500).json({error: `Failed to make follow connection ${err}`}));
});

//User decides they do not wish to follow a user anymore. 
router.delete('/:user_id/:following_id', authenticate, (req,res) => {
  const userId = req.params.user_id;
  const followingId = req.params.following_id; 
  return userFollowersDB
    .removeFollow(userId, followingId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json({error: `Failed to remove follow ${err}`}));
});


module.exports = router; 
