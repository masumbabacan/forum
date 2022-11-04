const express = require("express");
const router = express();
const {authenticateUser,authorizePermissions} = require("../middleware/authentication");
const { 
    getAllPosts,
} = 
require("../controllers/postController");

router.get("/",authenticateUser,authorizePermissions('admin','user'),getAllPosts);

module.exports = router; 