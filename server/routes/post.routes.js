const express = require('express');
const router = express.Router();

const post_controller = require('./post.controller')

router.post("/api/ethereum/create_post", post_controller.createPost);
router.put("/api/ethereum/update_post",  post_controller.updatePost);
router.get("/api/ethereum/viewtask/:id", post_controller.viewPost);
router.get("/api/ethereum/allposts", post_controller.getAllPosts);
router.post("/api/ethereum/delete_post", post_controller.deletePost);

module.exports = router