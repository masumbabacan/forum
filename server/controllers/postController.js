const Post = require("../models/Post");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
    checkPermissions, 
    nullControl,
} = require("../utils");

const getAllPosts = async (req,res) => {
    const posts = await Post.find({isDeleted : false});
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", NumberOfData : users.length, data : posts });
}

module.exports = {
    getAllPosts,
}