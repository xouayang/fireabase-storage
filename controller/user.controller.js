const User = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.create = async (req, res) => {
    try {
        const salt = await bcrypt.genSaltSync(10)
        const password = await bcrypt.hashSync(req.body.password,salt)
        const data = {
            username:req.body.username,
            password
        }
      const user = await User.create(data)
       res.status(201).json(user)
    } catch (error) {
      console.log(error)  
    }
}
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({ where: { username: username } }).then((data) => {
      const validPassword = bcrypt.compare(password, data.password);
      if (validPassword) {
          const user = { ID: data.id, USERNAME: data.username };
          const token = jwt.sign(user, "CCCCCCCCCC", { expiresIn: '120d' });
          return res.status(200).json({ result: 'Login success', token: token });
      }
      return res.status(403).json({ result: 'Login failed' });
  }).catch((error) => {
      return res.status(500).json({ result: "error"});});
}
// get all 
exports.getall = async (req, res) => {
      // const payload  = req.payload;
      // console.log("payload" , payload)
    try {
       const category = await User.findAndCountAll()
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