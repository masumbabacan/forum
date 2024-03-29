const express = require("express");
const router = express();
const {authenticateUser,authorizePermissions} = require("../middleware/authentication");
const { 
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = 
require("../controllers/userController");

router.get("/",authenticateUser,authorizePermissions('user'),getAllUsers);
router.get("/showMe",authenticateUser,showCurrentUser);
router.get("/:id",authenticateUser,authorizePermissions('admin'),getUser);
router.patch("/updateUserPassword",authenticateUser,updateUserPassword);
router.patch("/updateUser",authenticateUser,updateUser);

module.exports = router; 