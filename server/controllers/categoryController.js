const Category = require("../models/Category");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
    checkPermissions,
    nullControl,
} = require("../utils");

const getAllData = async (req,res) => {
    const categories = await Category.find({});
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", NumberOfData : categories.length, data : categories });
}

const getByIdData = async (req,res) => {
    const category = await Category.findOne({_id : req.params.id});
    if (!category) throw new CustomError.NotFoundError("Kategori Bulunamadı");
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", data : category});
}

const createData = async (req,res) => {
    const {name} = req.body;
    await nullControl([name]);
    const categoryExist = await Category.findOne({name : name});
    if (categoryExist) throw new CustomError.BadRequestError("Bu kayıttan zaten var");
    const category = await Category.create({name : name});
    if (!category) throw new CustomError.BadRequestError("Kayıt eklenirken beklenmedik bir hata oluştu lütfen daha sonra tekrar deneyin");
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", data : category});
}

const updateData = async (req,res) => {
    const {name} = req.body;
    await nullControl([name]);
    const categoryExist = await Category.findOne({name : name});
    if (categoryExist) throw new CustomError.NotFoundError("Güncellemeye çalıştığınız kayıt veri tabanında tekrar ediyor");
    const category = await Category.findOne({_id : req.params.id});
    if (!category) throw new CustomError.NotFoundError("Kayıt bulunamadı");
    category.name = name;
    await category.save();
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", data : category});
}

const removeData = async (req,res) => {
    const category = await Category.findOne({_id : req.params.id}); 
    if (!category) throw new CustomError.NotFoundError("Kayıt Bulunamadı");
    await category.delete();
    res.status(StatusCodes.OK).json({msg : "İşlem başarılı", data : category});
}

module.exports = {
    getAllData,
    getByIdData,
    createData,
    updateData,
    removeData
}