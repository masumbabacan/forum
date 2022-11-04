const express = require("express");
const router = express();
const {authenticateUser,authorizePermissions} = require("../middleware/authentication");
const { 
    getAllData,
    getByIdData,
    createData,
    updateData,
    removeData
} = 
require("../controllers/categoryController");

router.get("/",authenticateUser,authorizePermissions('admin','user'),getAllData);
router.get("/:id",authenticateUser,authorizePermissions('admin','user'),getByIdData);
router.post("/",authenticateUser,authorizePermissions('admin'),createData);
router.patch("/:id",authenticateUser,authorizePermissions('admin'),updateData);
router.delete("/:id",authenticateUser,authorizePermissions('admin'),removeData);

module.exports = router; 