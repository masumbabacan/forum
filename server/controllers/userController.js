const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { caching, delCache } = require('../middleware/redis-cache');
const {
    createTokenUser,
    attachCookiesToResponse,
    checkPermissions, 
    nullControl,
    singleImageUpload, 
    fileDelete
} = require("../utils");

const getAllUsers = async (req,res) => {
    const users = await User.find({role:"user"}).select('-password -__v -verificationToken -passwordToken -passwordTokenExpirationDate');
    caching('getAllUsers',users);
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", NumberOfData : users.length, data : users });
}

const getUser = async (req,res) => {
    const user = await User.findOne({username:req.params.id}).select('-password -__v -verificationToken -passwordToken -passwordTokenExpirationDate');
    if (!user) throw new CustomError.NotFoundError("Kullanıcı Bulunamadı");
    res.status(StatusCodes.OK).json({user : user,msg : "İşlem başarılı"});
}

const showCurrentUser = async (req,res) => {
    const user = await User.findOne({_id : req.user.userId}).select('-password -__v -verificationToken -passwordToken -passwordTokenExpirationDate');
    res.status(StatusCodes.OK).json({data : user});
}

const updateUser = async (req,res) => {
    const {name,surname} = req.body;
    const user = await User.findOne({_id : req.user.userId});
    if (!user) throw new CustomError.NotFoundError('Kayıt bulunamadı');
    checkPermissions(req.user,user._id);
    user.name = name;
    user.surname = surname;
    await user.save();
    if (req.files) {
        await fileDelete(user.image);
        const image = await singleImageUpload(req);
        user.image = image;
        await user.save();
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({res,user:tokenUser});
    delCache('getAllUsers');
    res.status(StatusCodes.OK).json({msg : "Güncelleme işlemi başarılı"});
}

const updateUserPassword = async (req,res) => {
    delCache('getAllUsers');
    const { oldPassword, newPassword } = req.body;
    await nullControl([oldPassword,newPassword]);
    const user = await User.findOne({_id : req.user.userId});
    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) throw new CustomError.UnauthenticatedError("Geçersiz kimlik bilgileri");
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({msg : "Şifre başarıyla güncellendi"});
}

module.exports = {
    getAllUsers,
    getUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}