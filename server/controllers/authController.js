const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const crypto = require('crypto');
const { 
    attachCookiesToResponse, 
    createTokenUser, 
    sendVerificationEmail, 
    sendResetPasswordEmail,
    createHash,
    nullControl
} = require("../utils/index");

const register = async (req,res) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    const emailExist = await User.findOne({email});
    if (emailExist) throw new CustomError.BadRequestError("Email daha önceden alınmış");
    const usernameExist = await User.findOne({username});
    if (usernameExist) throw new CustomError.BadRequestError("kullanıcı adı daha önceden alınmış");
    const verificationToken = crypto.randomBytes(40).toString('hex');
    const origin = 'http://localhost:3000/api/forum/auth';
    await sendVerificationEmail({
        name : username,
        email : email,
        verificationToken : verificationToken,
        origin : origin,
    });
    const user = await User.create({email,username,password,verificationToken});
    if (!user) throw new CustomError.BadRequestError("Bir hata oluştu");
    res.status(StatusCodes.CREATED).json({msg : "İşlem başarılı! Lütfen hesabınızı doğrulamak için e-postanızı kontrol edin"});
}

const verifyEmail = async (req,res) => {
    const {verificationToken,email} = req.body;
    const user = await User.findOne({email});
    if (!user || user.verificationToken !== verificationToken) throw new CustomError.UnauthenticatedError("Doğrulama esnasında hata oluştu");
    await User.findOneAndUpdate(
        {_id : user._id},
        {isVerified : true, verified : Date.now(),verificationToken : ''}
    );
    res.status(StatusCodes.OK).json({msg : 'E-posta doğrulandı'});
}

const login = async (req,res) => {
    const {username,password} = req.body;
    await nullControl([username,password]);
    const user = await User.findOne({username});
    if (!user) throw new CustomError.UnauthenticatedError("Geçersiz kimlik bilgileri");
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new CustomError.BadRequestError("Geçersiz kimlik bilgileri");
    const tokenUser = createTokenUser(user);
    let refreshToken = '';
    const existingToken = await Token.findOne({ user : user._id });
    if (existingToken) {
        if (!existingToken.isValid) throw new CustomError.UnauthenticatedError("geçersiz kimlik bilgileri");
        refreshToken = existingToken.refreshToken;
        attachCookiesToResponse({res,user:tokenUser,refreshToken});
        res.status(StatusCodes.OK).json({user:tokenUser, msg: 'Giriş başarılı'});
        return;
    }
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;
    const userToken = {refreshToken,ip,userAgent,user:user._id};
    await Token.create(userToken);
    attachCookiesToResponse({res,user:tokenUser,refreshToken});
    res.status(StatusCodes.OK).json({user: tokenUser, msg: 'Giriş başarılı'});
}

const logout = async (req,res) => {
    await Token.findOneAndDelete({user:req.user.userId});
    res.cookie("accessToken","logout",{
        httpOnly : true,
        expires : new Date(Date.now()),
    });
    res.cookie("refreshToken","logout",{
        httpOnly : true,
        expires : new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({msg : 'Kullanıcı çıkış yaptı'});
}

const forgotPassword = async (req,res) => {
    const {email} = req.body;
    await nullControl([email]);
    const user = await User.findOne({email});
    if (!user) throw new CustomError.BadRequestError("E-posta hatalı");
    const passwordToken = crypto.randomBytes(70).toString("hex");
    const origin = 'http://localhost:3000/api/v1/auth';
    await sendResetPasswordEmail({
        name:user.username,
        email:user.email,
        token: passwordToken,
        origin : origin,
    });
    const tenMinutes = 1000*60*10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
    res.status(StatusCodes.OK).json({msg : "Şifrenizi sıfırlamak için lütfen e-posta adresinizi kontrol edin"});
}

const resetPassword = async (req,res) => {
    const {token,email,password} = req.body;
    await nullControl([token,email,password]);
    const user = await User.findOne({email});
    if (!user) throw new CustomError.BadRequestError("Geçersiz kimlik bilgileri");
    const currentDate = new Date();
    createHash(token);
    if (user.passwordToken !== token || !user.passwordTokenExpirationDate > currentDate) {
        throw new CustomError.BadRequestError("Geçersiz kimlik bilgileri");
    }
    user.password = password,
    user.passwordToken = null,
    user.passwordTokenExpirationDate = null,
    await user.save();
    res.status(StatusCodes.OK).json({msg : "Şifre sıfırlandı"});
}

module.exports = {
    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword,
};