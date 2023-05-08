const { QueryTypes } = require('sequelize')
const sequelize = require('../config/db')
const Category = require('../model/category.model')
const ProductImage = require('../model/product.image.model')
exports.create = async (req, res) => {
    try {
      const category = await Category.create({category: req.body.category})
       res.status(201).json(category)
    } catch (error) {
      console.log(error)  
    }
}
exports.createImage = async (req, res) => {
    try {
      const Image = await ProductImage.create({...req.body})
       res.status(201).json(Image)
       const sql = 'select * from users';
       await sequelize.query(sql,{type:QueryTypes.SELECT}).then( async(data) => {
        let datas = [];
        for (let i = 0; i < data.length;i++) {
          const image = await sequelize.query(`select * from user where product = '${data[0].id}'`,
          {type:QueryTypes.SELECT});
          data[i] = {...data[i],image}
          datas = [...datas,data[i]]
          
        }
       })
    } catch (error) {
      console.log(error)  
    }
}


// get all 
exports.getall = async (req, res) => {
    try {
       const category = await Category.findAndCountAll()
      if(category.length == 0) {
        return res.status(404).json({message:"NOT FOUND DATA"})
      } else {
        return res.status(200).json(category)
      }
    } catch (error) {
      console.log(error)  
    }
}
// get by id
exports.getSingle = async (req, res) => {
    try {
       const {id} = req.params;
       const category = await Category.findByPk(id)
       if(category) {
        res.json(category)
       } 
    } catch (error) {
      console.log(error)  
    }
}
// update 
exports.updateData = async (req, res) => {
    try {
      const {id} = req.params;
      const categoryData = await Category.findByPk(id)   
      if(categoryData) {
         categoryData.category = req.body.category
         await categoryData.save()
         res.json(categoryData)
      } else {
        res.send("NOT FOUND")
      }
    } catch (error) {
     console.log(error)   
    }
}

// delete 
exports.deleteData = async (req, res) => {
    try {
      const {id} = req.params;
      const categoryData = await Category.findByPk(id)   
      if(categoryData) {
         categoryData.destroy()
         res.json("Deleted")
      } else {
        res.send("NOT FOUND")
      }
    } catch (error) {
     console.log(error)   
    }
}