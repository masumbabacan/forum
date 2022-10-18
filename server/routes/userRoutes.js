const express = require("express");
const router = express();
const {authenticateUser,authorizePermissions} = 
require("../middleware/authentication");

const { getCached } = require("../middleware/redis-cache");
const { requestIp } = require("../middleware/request-ip");
const { 
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
} = 
require("../controllers/userController");

router.get("/",authenticateUser,authorizePermissions('user'),getCached,getAllUsers);
router.get("/showMe",authenticateUser,requestIp,showCurrentUser);
router.get("/:id",getUser);
router.patch("/updateUserPassword",authenticateUser,updateUserPassword);
router.patch("/updateUser",authenticateUser,updateUser);

module.exports = router; 